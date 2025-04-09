import pkg from 'pg';
const {Pool} = pkg;

export const pool = new Pool({
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'bookstore',
  password: process.env.PG_PASSWORD || '2508',
  port: process.env.PG_PORT || 5432
});

(async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL database');
  } catch (err) {
    console.error('Failed to connect to PostgreSQL database:', err);
  }
})();