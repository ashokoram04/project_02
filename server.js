const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // use your MySQL username
  password: 'Ashok@0207',         // use your MySQL password
  database: 'portfolio_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database.');
});

// Handle contact form submissions
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error saving contact:', err);
      return res.status(500).json({ error: 'Failed to save contact.' });
    }
    res.status(200).json({ message: 'Contact saved!' });
  });
});
const path = require('path'); // Add this at the top

// ...existing code...

// Serve static files from your project directory
app.use(express.static(path.join(__dirname)));

// ...existing code...

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});