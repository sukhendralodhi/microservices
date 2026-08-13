import path from "node:path";
import { pool } from "../lib/db";


const MIGRATIONS_DIR = path.join(process.cwd(), 'migrations');

const CREATE_MIGRATIONS_TABLE_SQL = `

    CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP NOT NULL DEFAULT NOW( )
    );

`

type MigrationRow = {
    name: string
}

async function getExecutedMigrations(): Promise<string[]> {
    const result = await pool.query<MigrationRow>(
        "SELECT name FROM migrations ORDER BY name"
    );

    return result.rows.map((row: MigrationRow) => row.name);
}

async function migrate(): Promise<void> {
    await pool.query(CREATE_MIGRATIONS_TABLE_SQL);
    const executed = new Set(await getExecutedMigrations())
}