const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotnev = require('dotnev');
const authenticationRoutes = require('./authentication');
const todoRoutes = require('./todo');


dotnev.config();
const app = express();
app.use(cors());
app.use(express.json());

const db = require('./db');

db.connect(err => {
    if (err) throw err;
    console.log('Connected.');
})

app.use('./api/authentication', authenticationRoutes);
app.use('./api/todo', todoRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000');
})
