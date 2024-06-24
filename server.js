const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const db = require("./lib/db"); // 데이터베이스 연결
const sessionOption = require("./lib/sessionOption"); // 세션 옵션

// CORS configuration
app.use(
  cors({
    origin: "https://www.codeadventure.shop",
    credentials: true,
  })
);

// Session configuration
var MySQLStore = require("express-mysql-session")(session);
var sessionStore = new MySQLStore(sessionOption);
app.use(
  session({
    key: "session_cookie_name",
    secret: "~",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware
app.use(express.static(path.join(__dirname, "/build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Constants
const port = 3001;

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

// Authentication check route
app.get("/authcheck", (req, res) => {
  const sendData = { isLogin: "" };
  if (req.session.is_logined) {
    sendData.isLogin = "True";
  } else {
    sendData.isLogin = "False";
  }
  res.send(sendData);
});

// User list route (for managers only)
app.get("/users", (req, res) => {
  if (req.session.is_manager) {
    db.query(
      "SELECT id, username, email, phone, coin, experience, cst, javast, pythonst, jsst, htmlst, cssst, level FROM users",
      (error, results, fields) => {
        if (error) {
          console.error("Database query error:", error);
          return res.status(500).json({ error: "Database query error" });
        }
        res.json(results);
      }
    );
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// User info route
app.get("/userinfo", (req, res) => {
  if (req.session.is_logined) {
    db.query(
      "SELECT username, email, phone, coin, experience, cst, javast, pythonst, jsst, htmlst, cssst, level FROM users WHERE username = ?",
      [req.session.nickname],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          res.send(results[0]);
        } else {
          res.status(404).json({ error: "User not found" });
        }
      }
    );
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Stages route
app.get("/stages", (req, res) => {
  if (req.session.is_logined) {
    const language = req.query.language;
    const quizTable = `${language}quiz`; // Dynamic table name
    const progressField = `${language}st`;

    db.query(
      `SELECT ${progressField} FROM users WHERE username = ?`,
      [req.session.nickname],
      function (error, results, fields) {
        if (error) throw error;
        const userProgress = results[0][progressField];
        db.query(
          `SELECT id FROM ${quizTable}`,
          function (error, results, fields) {
            if (error) throw error;
            res.json({ stages: results, userProgress });
          }
        );
      }
    );
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Quiz route
app.get("/quiz/:stageId", (req, res) => {
  const stageId = req.params.stageId;
  const language = req.query.language;
  const quizTable = `${language}quiz`; // Dynamic table name

  db.query(
    `SELECT * FROM ${quizTable} WHERE id = ?`,
    [stageId],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: "Quiz not found" });
      }
    }
  );
});

// Submit answer route
app.post("/submit-answer", (req, res) => {
  const { stageId, answer, answerKey, language } = req.body;
  const quizTable = `${language}quiz`;
  const progressField = `${language}st`;

  if (req.session.is_logined) {
    db.query(
      `SELECT ${answerKey} FROM ${quizTable} WHERE id = ?`,
      [stageId],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          const correctAnswer = results[0][answerKey] === answer;

          if (correctAnswer) {
            db.query(
              `SELECT ${progressField}, experience, level FROM users WHERE username = ?`,
              [req.session.nickname],
              function (error, results, fields) {
                if (error) throw error;
                const userProgress = results[0][progressField];
                const currentExperience = results[0].experience;
                const currentLevel = results[0].level;
                const newExperience =
                  currentExperience + (userProgress < stageId ? 50 : 0); // Award experience only if the stage is new
                let newLevel = currentLevel;

                let requiredExperience = 200;
                for (let i = 1; i < newLevel; i++) {
                  requiredExperience *= 2.5;
                }

                let levelUp = false;
                if (newExperience >= requiredExperience) {
                  newLevel += 1;
                  levelUp = true;

                  // Reset experience for the next level
                  const nextLevelExperience = 0; // You can set this to any initial value for the next level
                  db.query(
                    `UPDATE users SET experience = ?, level = ? WHERE username = ?`,
                    [nextLevelExperience, newLevel, req.session.nickname],
                    function (error, results, fields) {
                      if (error) throw error;

                      // Award additional experience and coins
                      const extraExperience = 100;
                      const randomCoin = Math.floor(Math.random() * 301) + 600;
                      db.query(
                        `UPDATE users SET experience = experience + ?, coin = coin + ? WHERE username = ?`,
                        [extraExperience, randomCoin, req.session.nickname],
                        function (error, results, fields) {
                          if (error) throw error;
                          res.json({
                            correct: true,
                            firstTime: userProgress < stageId,
                            levelUp,
                            newLevel,
                            correctAnswer,
                          });
                        }
                      );
                    }
                  );
                } else {
                  let updateQuery = `UPDATE users SET experience = ?, level = ? WHERE username = ?`;
                  if (userProgress < stageId) {
                    updateQuery = `UPDATE users SET ${progressField} = ${progressField} + 1, coin = coin + 500, experience = ?, level = ? WHERE username = ?`;
                  }

                  db.query(
                    updateQuery,
                    [newExperience, newLevel, req.session.nickname],
                    function (error, results, fields) {
                      if (error) throw error;

                      if (levelUp) {
                        const extraExperience = 100;
                        const randomCoin =
                          Math.floor(Math.random() * 301) + 600;
                        db.query(
                          `UPDATE users SET experience = experience + ?, coin = coin + ? WHERE username = ?`,
                          [extraExperience, randomCoin, req.session.nickname],
                          function (error, results, fields) {
                            if (error) throw error;
                            res.json({
                              correct: true,
                              firstTime: userProgress < stageId,
                              levelUp,
                              newLevel,
                              correctAnswer,
                            });
                          }
                        );
                      } else {
                        res.json({
                          correct: true,
                          firstTime: userProgress < stageId,
                          levelUp,
                          newLevel,
                          correctAnswer,
                        });
                      }
                    }
                  );
                }
              }
            );
          } else {
            res.json({ correct: false, correctAnswer });
          }
        } else {
          res.status(404).json({ error: "Quiz not found" });
        }
      }
    );
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Logout route
app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

// Login route
app.post("/login", (req, res) => {
  const username = req.body.userId;
  const password = req.body.userPassword;
  const sendData = { isLogin: "", isManager: false };

  if (username && password) {
    if (username === "root" && password === "1234") {
      req.session.is_logined = true;
      req.session.nickname = username;
      req.session.is_manager = true;
      req.session.save(function () {
        sendData.isLogin = "True";
        sendData.isManager = true;
        res.send(sendData);
      });
    } else {
      db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        function (error, results, fields) {
          if (results.length > 0) {
            bcrypt.compare(
              password,
              results[0].password,
              function (err, result) {
                if (result) {
                  req.session.is_logined = true;
                  req.session.nickname = username;
                  req.session.save(function () {
                    sendData.isLogin = "True";
                    res.send(sendData);
                  });
                } else {
                  res.status(401).json({ error: "Authentication failed" });
                }
              }
            );
          } else {
            res.status(401).json({ error: "User not found" });
          }
        }
      );
    }
  } else {
    res.status(401).json({ error: "Authentication failed" });
  }
});

// Server listening
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
