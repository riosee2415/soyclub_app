const mysql2 = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql2.createPool({
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

module.exports = db;
