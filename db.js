import pkg from 'pg';
const { Pool } = pkg;


export const pool = new Pool({
    host: 'db',
    port: 5432,
    user: 'root',
    password: 'password',
    database: "postgresdb"
})