const express = require('express')
const session = require('express-session')
const path = require('path');
const app = express()
const port = 3001

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
}))

app.get('/', (req, res) => {    
    res.sendFile(path.join(__dirname, '/build/index.html'));
})

app.get('/authcheck', (req, res) => {      
    const sendData = { isLogin: "" };
    if (req.session.is_logined) {
        sendData.isLogin = "True"
    } else {
        sendData.isLogin = "False"
    }
    res.send(sendData);
})

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
                bcrypt.compare(password , results[0].password, (err, result) => {
                    if (result === true) {
                        req.session.is_logined = true;
                        req.session.nickname = username;
                        req.session.save(function () {
                            sendData.isLogin = "True"
                            res.send(sendData);
                        });
                        db.query(`INSERT INTO logTable (created, username, action, command, actiondetail) VALUES (NOW(), ?, 'login' , ?, ?)`,
                            [req.session.nickname, '-', `React 로그인 테스트`], function (error, result) { });
                    } else {
                        sendData.isLogin = "로그인 정보가 일치하지 않습니다."
                        res.send(sendData);
                    }
                })                      
            } else {
                sendData.isLogin = "아이디 정보가 일치하지 않습니다."
                res.send(sendData);
            }
        });
    } else {
        sendData.isLogin = "아이디와 비밀번호를 입력하세요!"
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
                        sendData.isSuccess = "True"
                        res.send(sendData);
                    });
                });
            } else if (password != password2) {
                sendData.isSuccess = "입력된 비밀번호가 서로 다릅니다."
                res.send(sendData);
            } else {
                sendData.isSuccess = "이미 존재하는 아이디 입니다!"
                res.send(sendData);  
            }            
        });        
    } else {
        sendData.isSuccess = "아이디, 비밀번호, 이메일, 전화번호를 입력하세요!"
        res.send(sendData);  
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
