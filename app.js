const express = require("express");                // Imports Express framework for building the web server
const path = require("path");                      // Imports path module for handling file and directory paths
const sqlite3 = require("sqlite3").verbose();      // Imports SQLite3 for database interaction
const app = express();                             // Creates Express application
const productRoutes = require('./routes/index');   // Imports routes for product-related pages
const adminRoutes = require('./routes/admin');     // Imports routes for admin-related pages

// Set up EJS as the view engine
app.set("view engine", "ejs");                    // Use EJS to render dynamic HTML
app.set("views", path.join(__dirname, "views"));  // Set the folder where EJS templates are stored

// Serve static files
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files like images, CSS, and JavaScript from the 'public' folder

// Middleware
app.use(express.json());                          // Enable parsing(interpreting & converting) of JSON in incoming requests
app.use(express.urlencoded({ extended: true }));  // Enable parsing(interpreting & converting) of form data in incoming requests


// Routes
app.use('/', productRoutes);                     // Use the product-related routes for the main part of the website
app.use('/admin', adminRoutes);                  // Use the admin-related routes for admin features


// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000"); // Start the server and log the URL
});
