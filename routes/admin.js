const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
});
const promisePool = pool.promise();

router.get('/', async function (req, res, next) {
    if (req.session.LoggedIn === true && req.session.admin === true) {
        const [rows] = await promisePool.query("SELECT id, name, votedOn, status FROM hl21users2");

        res.render('uList.njk', {
            title: 'Lista av användare',
            rows: rows,
            user: req.session.user,
            loggedIn: req.session.LoggedIn,
            admin: req.session.admin,
        });
    } else {
        console.log('non admin' + req.session.admin + '   ' + req.session.LoggedIn)
        res.redirect('/')
    }
});

module.exports = router;