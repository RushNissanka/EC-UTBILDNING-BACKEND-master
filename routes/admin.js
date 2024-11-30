// routes/admin.js
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Route for the admin products page
router.get('/products', (req, res) => {
    const db = new sqlite3.Database('./db/products.db');

    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
            console.error("Failed to retrieve products:", err.message);
            return res.status(500).send("Failed to retrieve products");
        }
        res.render('admin/products/index', { products: rows }); // Pass products to EJS
    });

    db.close();
});

module.exports = router;
