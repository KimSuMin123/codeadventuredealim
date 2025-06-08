var mysql = require("mysql2");
var db = mysql.createConnection({
  host: "svc.sel5.cloudtype.app", // Updated host
  user: "root",
  password: "0000",
  database: "codeadventure",
  port: 31479, // Updated port
});
db.connect();

module.exports = db;
