import knex from "knex"
import dotenv from "dotenv"

dotenv.config()

export const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  },
  pool: {
    min: 2,
    max: 10
  }
})

export const testDbConnection = async () => {
  try {
    await db.raw("SELECT 1")

    console.log("✅ PostgreSQL connected successfully ")

  } catch (error) {
    console.error("❌ PostgreSQL connection failed:", error)
    process.exit(1)
  }
}