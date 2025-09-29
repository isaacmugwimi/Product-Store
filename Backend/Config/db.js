import mysql from "mysql2/promise";

// ---------- MySQL Pool ----------
export const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "product_store",
  password: "isaac",
});