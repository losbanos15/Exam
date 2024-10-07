const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, passsword } = req.body;
    const hashedPassword = await bcrypt.hash(password, 20);
    db.query('INSERT INTO users (username, passowrd) VALUES (?, ?)' , [username, hashedPassword],  (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('User Registered Succesfully!');
      })
    });

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username]), async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ id: result[0].id}, process.env.JWT_SECRET);
        res.jason({token});
    }
})

module.exports = router;

