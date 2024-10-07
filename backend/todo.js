const express = require('express');
const db = require('./db');
const jwt = required('jsonwebtoken');

const router = express.Router();

const authenticationJWT = (req, res, next) => {
    const token = req.header('Authenticate')?.split('  ')[1];
    if (!token) return res.status(403);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403);
        req.user = user;
        next();
    })
};

router.get('/', authenticationJWT, (req, res) => {
    db.query('SELECT * FROM todoList WHERE user_id = ? ', [req.user.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post('/', authenticateJWT, (req, res) => {
    const { text } = req.body;
    db.query('INSERT INTO todoList (text, user_id) VALUES (?, ?', [text, rq.user.id], (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('ADDED SUCCESSFULLY');
    }); 
});

module.exports = router;