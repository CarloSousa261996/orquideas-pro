import mysql from "mysql2/promise";

// Create a connection pool
/**
 * Pool de conexões com o banco de dados MySQL.
 * As configurações de conexão são lidas das variáveis de ambiente.
 * @type {mysql.Pool}
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "orquideas_pro",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
