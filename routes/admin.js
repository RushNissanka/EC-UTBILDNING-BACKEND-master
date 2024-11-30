const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Route for the admin products page
router.get('/products', (req, res) => {
    const db = new sqlite3.Database('./db/products.db');

    db.all('SELECT title, sku, price FROM products', [], (err, rows) => {
        if (err) {
            console.error('Failed to retrieve products:', err.message);
            return res.status(500).render('error', { message: 'Failed to load products.' });
        }

        // Pass the rows (products) to the view
        res.render('admin/products/index', { products: rows });
    });

    db.close();
});

// Route to render the "new product" form
router.get('/products/new', (req, res) => {
    res.render('admin/products/new'); // Renders views/admin/products/new.ejs
});

// POST route to handle new product submissions
router.post('/products/new', express.json(), (req, res) => {
    const { name, description, price, sku, image, categories, brand } = req.body;

    // Basic validation
    if (!name || !image || !sku || !price || !brand) {
        return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    // Generate slug from the product name
    const slug = name.toLowerCase().replace(/ /g, '-');

    // Handle categories (ensure it's converted to a string)
    const categoriesStr = Array.isArray(categories) ? categories.join(', ') : categories || '';

    // Insert data into SQLite database
    const db = new sqlite3.Database('./db/products.db');
    const query = `
        INSERT INTO products (title, description, price, sku, image, brand, categories, slug)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(query, [name, description, price, sku, image, brand, categoriesStr, slug], function (err) {
        if (err) {
            console.error('Failed to save product:', err.message);
            return res.status(500).json({ error: 'Failed to save product.' });
        }

        console.log('Product saved successfully!');
        res.status(200).json({ message: 'Product saved successfully.' });
    });

    db.close();
});

// API endpoint to get products
router.get('/api/products', (req, res) => {
    const db = new sqlite3.Database('./db/products.db');

    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            console.error('Failed to retrieve products:', err.message);
            return res.status(500).json({ error: 'Failed to retrieve products.' });
        }
        res.json(rows);
    });

    db.close();
});

module.exports = router;
