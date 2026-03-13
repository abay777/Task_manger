import { dbConfig } from "./config.types";
import "./env";

export const databaseConfig: dbConfig = {
  db_url: process.env.DATABASE_URL || ""
};

export const mainCofig = {
  PORT: Number(process.env.PORT) || 4200,
};
