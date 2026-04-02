const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

const app = express();

// Debug: Check if environment variables are loaded
if (!process.env.DB_HOST) {
  console.error('❌ ERROR: Environment variables not loaded! Check your .env file encoding.');
  process.exit(1); 
}

// Security: Restrict CORS to your specific domain in production
app.use(cors()); 
app.use(express.json());

// Rate Limiting: Prevent abuse (max 100 requests per 15 mins)
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Email Transporter Configuration
// Note: For Gmail, use an "App Password". For production, use a service like SendGrid/Mailgun.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Visitor Tracking Route
// Handle pool errors to prevent the process from crashing if the DB drops later
db.on('error', (err) => {
  console.error('Unexpected database pool error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Database connection was closed. Reconnecting...');
  }
});

app.post('/website_data', (req, res) => {
  const { page } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const sql = "INSERT INTO visitors (IP, page) VALUES (?, ?)";
  
  db.query(sql, [ip, page], (err, result) => {
    if (err) {
      console.error("Insert failed:", err);
      return res.status(500).send({ error: "Database error" });
    }
    
    db.query("SELECT COUNT(DISTINCT IP) as count FROM visitors", (err, rows) => {
      const count = err ? 0 : rows[0].count;
      console.log(`📝 Logged: ${ip} visited ${page}`);
      res.send({ status: 'success', count: count });
    });
  });
});

// Contact Form Route
app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // 1. Save to Database
  const sql = "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, subject, message], (err) => {
    if (err) {
      console.error("Failed to save message:", err);
      return res.status(500).send({ error: "Database error" });
    }

    // 2. Send Email Notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO, 
      subject: `Portfolio Contact: ${subject}`,
      text: `New message from ${name} (${email}):\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.warn("Email failed to send, but message was saved to DB:", error);
        // We still return success because the message is safely in the DB
        return res.send({ status: 'success', note: 'Saved to DB, email failed' });
      }
      res.send({ status: 'success' });
    });
  });
});

app.get('/website_data', (req, res) => {
  db.query("SELECT COUNT(DISTINCT IP) as count FROM visitors", (err, rows) => {
    if (err) {
      console.error("Fetch failed:", err);
      return res.status(500).send({ status: "Error", count: 0 });
    }
    res.send({ status: "Connected successfully", count: rows[0].count });
  });
});

// --- ADMIN ROUTES ---
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin123'; // CHANGE THIS in .env

const adminAuth = (req, res, next) => {
  const secret = req.headers['x-admin-secret'];
  if (!secret || secret !== ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized: Invalid Secret' });
  }
  next();
};

app.get('/admin/messages', adminAuth, (req, res) => {
  // Assumes 'id' or 'created_at' exists.. Using ID for safety.
  db.query("SELECT * FROM contact_messages ORDER BY id DESC LIMIT 50", (err, rows) => {
    if (err) return res.status(500).send({ error: "Database error" });
    res.send(rows);
  });
});

app.get('/admin/visitors', adminAuth, (req, res) => {
  db.query("SELECT * FROM visitors ORDER BY id DESC LIMIT 1000", (err, rows) => {
    if (err) return res.status(500).send({ error: "Database error" });
    res.send(rows);
  });
});

// Function to test connection and start server
function startApp() {
  console.log(`Checking database connection to ${process.env.DB_HOST}...`);
  db.getConnection((err, connection) => {
    if (err) {
      console.error(`❌ Database Error (${err.code}): ${err.message}. Retrying in 5s...`);
      setTimeout(startApp, 5000); // Wait 5 seconds and try again
      return;
    }
    
    console.log('✅ Database connected successfully.');
    connection.release(); // Return the connection to the pool
    
    app.listen(3000, () => console.log('🚀 Tracker running on port 3000 (HTTP)'));
  });
}

startApp();