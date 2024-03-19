import mysql from 'mysql2/promise'; // Importing mysql2 library

export default async function handler(req, res) {
  // MySQL connection configuration
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  try {
    // Selecting all data from the MySQL table
    const [rows] = await connection.execute('SELECT * FROM codepiler');

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data.' });
  } finally {
    // Close the MySQL connection
    await connection.end();
  }
}
