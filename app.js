// app.js
const express = require("express");
const path = require("path");
const app = express();

const productRoutes = require('./routes/index'); // User-facing routes
const adminRoutes = require('./routes/admin');   // Admin routes

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/admin', adminRoutes);  // Admin routes
app.use('/', productRoutes);     // User-facing routes

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
