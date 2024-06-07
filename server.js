const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const port = 3001;

const db = require('./lib/db');
const sessionOption = require('./lib/sessionOption');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(sessionOption);
app.use(session({  
    key: 'session_cookie_name',
    secret: '~',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => {    
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.get('/authcheck', (req, res) => {      
    const sendData = { isLogin: "" };
    if (req.session.is_logined) {
        sendData.isLogin = "True";
    } else {
        sendData.isLogin = "False";
    }
    res.send(sendData);
});

app.get('/userinfo', (req, res) => {
    if (req.session.is_logined) {
        db.query('SELECT username, email, phone, coin, experience, cst, javast, pythonst, jsst, htmlst, cssst, level FROM users WHERE username = ?', [req.session.nickname], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.send(results[0]);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

app.get('/stages', (req, res) => {
    if (req.session.is_logined) {
        const language = req.query.language;
        const quizTable = `${language}quiz`;  // 동적으로 테이블 이름을 설정
        const progressField = `${language}st`;
        
        db.query(`SELECT ${progressField} FROM users WHERE username = ?`, [req.session.nickname], function(error, results, fields) {
            if (error) throw error;
            const userProgress = results[0][progressField];
            db.query(`SELECT id FROM ${quizTable}`, function(error, results, fields) {
                if (error) throw error;
                res.json({ stages: results, userProgress });
            });
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

app.get('/quiz/:stageId', (req, res) => {
    const stageId = req.params.stageId;
    const language = req.query.language;
    const quizTable = `${language}quiz`;  // 동적으로 테이블 이름을 설정
    
    db.query(`SELECT * FROM ${quizTable} WHERE id = ?`, [stageId], function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'Quiz not found' });
        }
    });
});

app.post('/submit', (req, res) => {
    const { stageId, answer, language } = req.body;
    const quizTable = `${language}quiz`;
    const progressField = `${language}st`;

    if (req.session.is_logined) {
        db.query(`SELECT answer FROM ${quizTable} WHERE id = ?`, [stageId], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0 && results[0].answer === answer) {
                db.query(`SELECT ${progressField}, experience, level FROM users WHERE username = ?`, [req.session.nickname], function(error, results, fields) {
                    if (error) throw error;
                    const userProgress = results[0][progressField];
                    const currentExperience = results[0].experience;
                    const currentLevel = results[0].level;
                    const newExperience = currentExperience + 50;
                    let newLevel = currentLevel;

                    // Calculate required experience for next level
                    let requiredExperience = 200;
                    for (let i = 1; i < newLevel; i++) {
                        requiredExperience *= 2.5;
                    }

                    // Determine if the user levels up
                    let levelUp = false;
                    if (newExperience >= requiredExperience) {
                        newLevel += 1;
                        levelUp = true;
                    }

                    let updateQuery = `UPDATE users SET ${progressField} = ${progressField} + 1, experience = ?, level = ? WHERE username = ?`;
                    if (userProgress < stageId) {
                        // 최초 성공 시 코인과 경험치 지급
                        updateQuery = `UPDATE users SET ${progressField} = ${progressField} + 1, coin = coin + 500, experience = ?, level = ? WHERE username = ?`;
                    }

                    db.query(updateQuery, [newExperience, newLevel, req.session.nickname], function(error, results, fields) {
                        if (error) throw error;
                        res.json({ correct: true, firstTime: userProgress < stageId, levelUp, newLevel });
                    });
                });
            } else {
                res.json({ correct: false });
            }
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

app.post("/login", (req, res) => {
    const username = req.body.userId;
    const password = req.body.userPassword;
    const sendData = { isLogin: "" };

    if (username && password) {
        db.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                bcrypt.compare(password, results[0].password, (err, result) => {
                    if (result === true) {
                        req.session.is_logined = true;
                        req.session.nickname = username;
                        req.session.save(function () {
                            sendData.isLogin = "True";
                            res.send(sendData);
                        });
                        db.query(`INSERT INTO logTable (created, username, action, command, actiondetail) VALUES (NOW(), ?, 'login' , ?, ?)`,
                            [req.session.nickname, '-', `React 로그인 테스트`], function (error, result) { });
                    } else {
                        sendData.isLogin = "로그인 정보가 일치하지 않습니다.";
                        res.send(sendData);
                    }
                });                      
            } else {
                sendData.isLogin = "아이디 정보가 일치하지 않습니다.";
                res.send(sendData);
            }
        });
    } else {
        sendData.isLogin = "아이디와 비밀번호를 입력하세요!";
        res.send(sendData);
    }
});

app.post("/signin", (req, res) => {
    const username = req.body.userId;
    const password = req.body.userPassword;
    const password2 = req.body.userPassword2;
    const email = req.body.email;
    const phone = req.body.phone;
    
    const sendData = { isSuccess: "" };

    if (username && password && password2 && email && phone) {
        db.query('SELECT * FROM users WHERE username = ?', [username], function(error, results, fields) {
            if (error) throw error;
            if (results.length <= 0 && password == password2) {
                const hashedPassword = bcrypt.hashSync(password, 10);
                db.query(`INSERT INTO users (username, password, email, phone, coin, experience, cst, javast, pythonst, jsst, cssst, htmlst, level) 
                          VALUES (?, ?, ?, ?, 0, 0, 0, 0, 0, 0, 0, 0, 1)`, 
                [username, hashedPassword, email, phone], function (error, data) {
                    if (error) throw error;
                    req.session.save(function () {                        
                        sendData.isSuccess = "True";
                        res.send(sendData);
                    });
                });
            } else if (password != password2) {
                sendData.isSuccess = "입력된 비밀번호가 서로 다릅니다.";
                res.send(sendData);
            } else {
                sendData.isSuccess = "이미 존재하는 아이디 입니다!";
                res.send(sendData);  
            }            
        });        
    } else {
        sendData.isSuccess = "아이디, 비밀번호, 이메일, 전화번호를 입력하세요!";
        res.send(sendData);  
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
