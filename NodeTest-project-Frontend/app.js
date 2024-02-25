const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 5501;

// Database connection details
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Krish@1998',
  database: 'node-test-project1',
  port: '3308'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handling form submission (POST request)
app.post('/submit', (req, res) => {
  const {
    playerName,
    dateOfBirth,
    photoUrl,
    birthplace,
    career,
    matches,
    fifties,
    centuries,
    wickets,
    average,
  } = req.body;

  // Insert data into the database
  const sql = `
    INSERT INTO players (
      playerName,
      dateOfBirth,
      photoUrl,
      birthplace,
      career,
      matches,
      fifties,
      centuries,
      wickets,
      average
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      playerName,
      dateOfBirth,
      photoUrl,
      birthplace,
      career,
      matches,
      fifties,
      centuries,
      wickets,
      average,
    ],
    (err, result) => {
      if (err) {
        console.error('Error inserting record: ', err);
        res.status(500).send('Error inserting record');
        return;
      }
      console.log('Record added successfully');
      res.send('Record added successfully');
    }
  );
});

// Handling search (GET request)
app.get('/search', (req, res) => {
  const searchPlayer = req.query.searchPlayer;

  // Search for player in the database
  const sql = `SELECT * FROM players WHERE playerName = ?`;
  db.query(sql, [searchPlayer], (err, result) => {
    if (err) {
      console.error('Error searching for player: ', err);
      res.status(500).send('Error searching for player');
      return;
    }

    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(404).send('Player not found');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

