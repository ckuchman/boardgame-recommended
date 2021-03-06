const path = require('path');
const express = require("express");
const { Pool } = require('pg');
const parseBGG = require('./parseBGG');

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Postgres connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/bglist', async (req, res) => {
  console.error(await parseBGG.getBgIds(5));
});

app.get('/api', async (req, res) => {
  const client = await pool.connect()
  const result = await client.query('SELECT * FROM test')
  await res.json({ rows: result.rows});
  await client.release()
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});