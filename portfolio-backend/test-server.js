require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/health', (req, res) => res.json({ success: true, status: 'ok' }));

connectDB(process.env.MONGO_URI)
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`✅ Test server started on port ${PORT}`);
      console.log(`✅ MongoDB Atlas connected successfully!`);
    });
    
    // Keep the process running
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
      });
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
