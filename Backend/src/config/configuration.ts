import { dbConfig } from "./config.types";
import "./env";

export const databaseConfig: dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
  connectionLimit:10
};

export const mainCofig = {
  PORT: Number(process.env.PORT) || 3000,
};
