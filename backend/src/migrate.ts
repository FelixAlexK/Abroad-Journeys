/* eslint-disable prettier/prettier */
import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, connection } from "./db";
import * as dotenv from "dotenv";
dotenv.config();

const runMigrations = async () => {
  await connection.connect();
  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, { migrationsFolder: "./drizzle" });

  // Don't forget to close the connection, otherwise the script will hang
  await connection.end();
};

runMigrations();
