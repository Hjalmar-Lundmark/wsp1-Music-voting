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
        const [songs] = await promisePool.query("SELECT hl21music.id, hl21music.votes, hl21users2.name, hl21music.songId FROM hl21users2 JOIN hl21music WHERE hl21music.authorId = hl21users2.id");

        res.render('uList.njk', {
            title: 'Lista av användare',
            rows: rows,
            songs: songs,
            user: req.session.user,
            loggedIn: req.session.LoggedIn,
            admin: req.session.admin,
        });
    } else {
        res.redirect('/')
    }
});

module.exports = router;