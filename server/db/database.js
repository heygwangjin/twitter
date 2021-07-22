import mysql from "mysql2";
import { config } from "../config.js";

// 데이터베이스 관리 역할
const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
});

export const db = pool.promise();