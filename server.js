// server.js — Main Entry Point
require('dotenv').config(); // MUST be the first line to load .env variables

const express = require('express');
const path = require('path');
const taskRoutes = require('./src/routes/taskRoutes'); // Import your MVC routes

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middleware to parse JSON bodies
app.use(express.json());

// 2. Serve static frontend files from the 'frontend' folder
// This allows you to access index.html at http://localhost:3000
app.use(express.static(path.join(__dirname, 'frontend')));

// 3. Health check route (optional, but good for testing)
app.get('/api', (req, res) => {
  res.json({ message: 'Task API is ready!', version: 'MVC + MySQL' });
});

// 4. Mount the task routes
// Any route inside taskRoutes.js will be prefixed with /tasks
app.use('/tasks', taskRoutes);

// 5. Global Error Handler 
// (Must be placed AFTER all routes to catch errors passed via next(err))
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// 6. Start the server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`🌐 Frontend available at http://localhost:${PORT}`);
  console.log(`=========================================`);
  console.log(`Available API Endpoints:`);
  console.log(`GET    /tasks`);
  console.log(`POST   /tasks`);
  console.log(`GET    /tasks/:id`);
  console.log(`PUT    /tasks/:id`);
  console.log(`PATCH  /tasks/:id`);
  console.log(`DELETE /tasks/:id`);
  console.log(`=========================================`);
});