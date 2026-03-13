import knex from "knex"
import { databaseConfig } from "../configuration"

export const db = knex({
  client: "mysql2",
  connection: databaseConfig
})

export const testDbConnection = async () => {
  try {
    await db.raw("SELECT 1")

    console.log("✅ MySQL connected successfully  //")

  } catch (error) {
    console.error("❌ MySQL connection failed:", error)
    process.exit(1)
  }
}