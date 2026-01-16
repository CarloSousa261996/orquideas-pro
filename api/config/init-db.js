import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Inicializa o banco de dados criando-o, criando o schema e preenchendo-o com dados iniciais.
 * Esta função é idempotente e não lançará um erro se o banco de dados já existir.
 * @returns {Promise<boolean>} Uma promessa que se resolve com true se o banco de dados foi inicializado com sucesso, ou false se um erro ocorreu.
 */
const initDatabase = async () => {
  try {
    // Connection without database to create it
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "root",
      port: process.env.DB_PORT || 3306,
    });

    console.log("✓ Connected to MySQL");

    // Create database
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || "orquideas_pro"}`);
    console.log("✓ Database created");

    // Close first connection
    await connection.end();

    // Create new connection to the database
    const dbConnection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_NAME || "orquideas_pro",
      port: process.env.DB_PORT || 3306,
    });

    // Read and execute schema
    const schemaPath = path.join(__dirname, "schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf8");
    const schemaStatements = schemaSql.split(";").filter((s) => s.trim());

    for (const statement of schemaStatements) {
      if (statement.trim()) {
        try {
          await dbConnection.query(statement);
        } catch (err) {
          // Ignore "table already exists" and "key name already exists" errors
          if (!err.message.includes("already exists") && !err.message.includes("Duplicate key")) {
            throw err;
          }
        }
      }
    }
    console.log("✓ Database schema ready");

    // Read and execute populate
    const populatePath = path.join(__dirname, "populate.sql");
    const populateSql = fs.readFileSync(populatePath, "utf8");
    const populateStatements = populateSql.split(";").filter((s) => s.trim());

    for (const statement of populateStatements) {
      if (statement.trim()) {
        try {
          await dbConnection.query(statement);
        } catch (err) {
          // Ignore duplicate entry errors
          if (!err.message.includes("Duplicate entry")) {
            throw err;
          }
        }
      }
    }
    console.log("✓ Database populated with initial data");

    await dbConnection.end();
    console.log("✓ Database initialization complete!");

    return true;
  } catch (error) {
    console.error("✗ Database initialization error:", error.message);
    return false;
  }
};

export default initDatabase;
