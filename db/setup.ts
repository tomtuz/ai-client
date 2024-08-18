import sqlite3 from "sqlite3";
import { execSync } from "node:child_process";
import fs from "node:fs";

const DB_PATH = './db/main.db';
const SCHEMA_PATH = './db/db_schema.sql';
const SEED_SCRIPT_PATH = './db/seed.ts';

function setupDatabase(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // Check if the database file already exists
    if (fs.existsSync(DB_PATH)) {
      console.log(`Database file ${DB_PATH} already exists. Skipping creation.`);
      return resolve();
    }

    // Create the database file
    const db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        return reject(err);
      }
      console.log(`Database file ${DB_PATH} created.`);

      // Apply the schema
      db.exec(fs.readFileSync(SCHEMA_PATH).toString(), (err) => {
        if (err) {
          return reject(err);
        }
        console.log(`Schema applied from ${SCHEMA_PATH}.`);
        resolve();
      });
    });
  });
}

function seedData() {
  console.log(`Seeding data using ${SEED_SCRIPT_PATH}.`);
  execSync(`tsx ${SEED_SCRIPT_PATH}`, { stdio: 'inherit' });
  console.log("Data seeded successfully.");
}

async function main() {
  try {
    await setupDatabase();
    seedData();
  } catch (err) {
    console.error('Error setting up the database:', err);
  }
}

main();
