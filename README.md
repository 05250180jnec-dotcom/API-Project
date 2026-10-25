# SYD204 Task API - Complete MVC Application

A professional Task List REST API built with **Node.js**, **Express**, **MySQL (Aiven Cloud)**, and a **Vanilla JS Frontend**. 

This project demonstrates the Model-View-Controller (MVC) architecture, connection pooling, parameterized SQL queries (to prevent SQL injection), and a fully functional client-side interface.

## 📁 Project Structure

```text
Task APIs-main/
├── database/
│   └── schema.sql          # SQL script to create the table and seed data
├── frontend/
│   ├── index.html          # The UI structure
│   ├── style.css           # The styling
│   └── script.js           # Client-side logic (Fetch API)
├── src/
│   ├── controllers/        # Handles HTTP requests and validation
│   ├── models/             # Handles SQL queries
│   ├── routes/             # Maps URLs to controllers
│   └── db.js               # MySQL connection pool
├── .env.example            # Template for environment variables
├── server.js               # Entry point for the Express server
├── test-db.js              # Script to test database connection
└── package.json            # Dependencies and scripts