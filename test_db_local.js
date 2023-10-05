const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Writecode@123",
  database: "csye6225"
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Close the connection after a short delay (for testing purposes)
setTimeout(() => {
  connection.end();
}, 5000); // Close the connection after 5 seconds (adjust as needed)
