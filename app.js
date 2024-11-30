const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const productRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin'); // Import admin routes

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/', productRoutes);
app.use('/admin', adminRoutes); // Add this line for admin routes


// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
