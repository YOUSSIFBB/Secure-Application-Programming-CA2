const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();


//cmd concole confermation that the file is running as expected 
console.log('Routes file loaded');

//connnect to the database
const db = new sqlite3.Database(path.join(__dirname, '../database/database.db'), (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

//Test database connection
//Test connection http://localhost:3000/api/test uisng postman or Apache JMeter
router.get('/test', (req, res) => {
    res.send('Routes are working, and database connection is active!');
});

router.post('/register', (req, res) => {
    const { message, name, email, phone } = req.body;

    //log the incoming data once recived by the api
    console.log('Received data:', req.body);

    //insert data into the users table in database.dat file without santization
    const sql = `INSERT INTO users (message, name, email, phone) VALUES (?, ?, ?, ?)`;
    db.run(sql, [message, name, email, phone], function (err) {
        if (err) {
            console.error('Error inserting data:', err.message);
            res.status(500).send('Failed to register. Please try again.');  
        } else {
            console.log('New user added with ID:', this.lastID);
            res.send('Registration successful!');
        }
    });
});


module.exports = router;

