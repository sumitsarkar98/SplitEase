import mysql from "mysql2/promise";
import "dotenv/config";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default pool;
