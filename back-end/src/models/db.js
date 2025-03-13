const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize database tables
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(50) NOT NULL,
        phoneNumber VARCHAR(20),
        weight DECIMAL(5,2) NOT NULL,
        height DECIMAL(5,2) NOT NULL,
        age INT NOT NULL,
        gender ENUM('male', 'female') NOT NULL,
        pregnant ENUM('yes', 'no') DEFAULT 'no',
        breastfeeding ENUM('yes', 'no') DEFAULT 'no',
        bmi DECIMAL(5,2) NOT NULL,
        caffeine DECIMAL(8,2) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    
    // Create indexes separately with error handling
    try {
      // Check if firstName index exists
      const [firstNameIndexes] = await connection.query(`
        SHOW INDEX FROM users WHERE Column_name = 'firstName'
      `);
      
      if (firstNameIndexes.length === 0) {
        await connection.query(`
          CREATE INDEX idx_firstName ON users (firstName)
        `);
      }
      
      // Check if createdAt index exists
      const [createdAtIndexes] = await connection.query(`
        SHOW INDEX FROM users WHERE Column_name = 'createdAt'
      `);
      
      if (createdAtIndexes.length === 0) {
        await connection.query(`
          CREATE INDEX idx_createdAt ON users (createdAt DESC)
        `);
      }
    } catch (indexErr) {
      console.warn('Warning: Could not create indexes:', indexErr.message);
      // Continue execution even if indexes fail
    }
    
    console.log('Database tables initialized');
    connection.release();
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  }
}

// Call this function when your app starts
initializeDatabase().catch(console.error);

module.exports = pool;