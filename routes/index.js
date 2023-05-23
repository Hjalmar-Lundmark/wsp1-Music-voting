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
const bcrypt = require('bcrypt');
let responseErr = {}

// GET music page
router.get('/', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT * FROM hl21music ORDER BY votes DESC");
    responseErr = {
        err: [],
    }

    // checks if the user has voted before, thus stopping them from voting again
    if (req.session.LoggedIn) {
        const [Voted] = await promisePool.query("SELECT hl21users2.votedOn FROM hl21users2 WHERE name=?", req.session.user);
        if (Voted[0].votedOn !== null) {
            req.session.voted = true;
            req.session.votedOn = Voted[0].votedOn;
        } else {
            req.session.voted = false;
        }
    }

    // turn this off to disable voting
    let votingEnabled = true;

    res.render('index.njk', {
        rows: rows,
        title: 'Utspringslåt - NTI TE20',
        user: req.session.user,
        loggedIn: req.session.LoggedIn,
        voted: req.session.voted, 
        votedOn: req.session.votedOn, 
        votingEnabled: votingEnabled,
        admin: req.session.admin, 
    });
});

// GET and POST for making a new post
router.get('/new', async function (req, res, next) {
    if (!req.session.LoggedIn) {
        return res.redirect('/login');
    } else {
        res.render('new.njk', {
            title: 'Infoga låt',
            user: req.session.user,
            loggedIn: req.session.LoggedIn,
            error: responseErr,
        });
    }
});

// submit new song
router.post('/new', async function (req, res, next) {
    const { content } = req.body;
    responseErr = {
        err: [],
    }
    
    if (!content) {
        responseErr.err.push('Infoga innehåll');
    }
    if (!content.startsWith("https://open.spotify.com/track/")) {
        if (!content.startsWith("https://open.spotify.com/episode/")) {
            responseErr.err.push('Behöver vara en spotify låt länk');
        }
    }

    if (responseErr.err.length === 0) {
        let spotify = content
        let part = spotify.split("/");
        let songId = part[4].split("?");

        // sanitizing is not needed because I have already edited the string enough
        const [rows] = await promisePool.query("INSERT INTO hl21music (authorId, songId, votes, sType) VALUES (?, ?, ?, ?)",
            [req.session.userId, songId[0], 0, part[3]]);
        res.redirect('/');
    } else {
        res.redirect('/new');
    }
});

//GET and POST login
router.get('/login', function (req, res, next) {
    if (req.session.LoggedIn) {
        return res.redirect('/');
    } else {
        res.render('login.njk', {
            title: 'Logga in',
            error: responseErr,
        });
    }
});

router.post('/login', async function (req, res, next) {
    const { username, password } = req.body;
    responseErr = {
        err: [],
    }
    if (username === "") {
        responseErr.err.push('Fyll i användarnamn');
    }
    if (password === "") {
        responseErr.err.push('Fyll i lösenord');
    }
    if (responseErr.err.length === 0) {
        const [users] = await promisePool.query("SELECT * FROM hl21users2 WHERE name=?", [username]);
        if (users.length > 0) {
            bcrypt.compare(password, users[0].password, function (err, result) {
                if (result) {
                    req.session.user = username;
                    req.session.userId = users[0].id;
                    req.session.LoggedIn = true;
                    if (users[0].status === 'admin') {
                        req.session.admin = true
                    }
                    return res.redirect('/');
                } else {
                    responseErr.err.push('Inkorrekt användarnamn eller lösenord');
                    res.redirect('/login');
                }
            });
        } else {
            responseErr.err.push('Inkorrekt användarnamn');
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
});


//GET and POST register
router.get('/register', async function (req, res) {
    if (req.session.LoggedIn) {
        return res.redirect('/');
    } else {
        res.render('register.njk', { 
            title: 'Skapa konto',
            error: responseErr, 
        })
    }
});

router.post('/register', async function (req, res) {
    const { username, password, passwordConfirmation } = req.body;
    responseErr = {
        err: [],
    }

    if (username === "") {
        responseErr.err.push('Fyll i användarnamn');
    }
    if (password === "") {
        responseErr.err.push('Fyll i lösenord');
    }
    if (password.length < 8) {
        responseErr.err.push('Lösenord måste innehålla minst 8 tecken');
    }
    if (password !== passwordConfirmation) {
        responseErr.err.push('Lösenord måste vara lika');
    }
    
    if (responseErr.err.length === 0) {
        const [userExists] = await promisePool.query("SELECT * FROM hl21users2 WHERE name=?", username);

        if (userExists.length > 0) {
            responseErr.err.push('Användarnamn är redan i användning');
            return res.redirect('/register');
        }

        await bcrypt.hash(password, 10, async function (err, hash) {
            const [rows] = await promisePool.query('INSERT INTO hl21users2 (name, password) VALUES (?, ?)', [username, hash])
            req.session.user = username;
            const [users] = await promisePool.query("SELECT * FROM hl21users2 WHERE name=?", username);
            req.session.userId = users[0].id;
            req.session.LoggedIn = true;
            if (users[0].status === 'admin') {
                req.session.admin = true
            }
            return res.redirect('/'); // Logs the user in after account is created
        });
    } else {
        res.redirect('/register');
    }
});


//Delete account
router.post('/delete', async function (req, res, next) {
    if (req.session.LoggedIn) {
        await promisePool.query('DELETE FROM hl21users2 WHERE name=?', req.session.user);
        req.session.LoggedIn = false;
        req.session.user = "";
        req.session.userId = null; // not sure what values these should have
        req.session.admin = false
        res.redirect('/');
    } else {
        return res.status(401).send("Access denied");
    }
});

//Log out
router.post('/logout', async function (req, res, next) {
    if (req.session.LoggedIn) {
        req.session.LoggedIn = false; 
        req.session.user = "";
        req.session.userId = null; // not sure what values these should have
        req.session.admin = false
        res.redirect('/');
    } else {
        return res.redirect('/');
    }
});

// Vote
router.post('/vote', async function (req, res, next) {
    if (req.session.LoggedIn) {
        const {rowId} = req.body; // Temp(?) solution to make voting work
        const [rows] = await promisePool.query("SELECT hl21music.votes, hl21music.songId FROM hl21music WHERE id=?", rowId);
        let count = rows[0].votes / 1; // javascript moment / convert to int
        count = count + 1;

        const [row] = await promisePool.query("UPDATE hl21music SET votes=? WHERE id=?", [count, rowId]);

        // confirm vote and disable voting again
        const [votedOn] = await promisePool.query("UPDATE hl21users2 SET votedOn=? WHERE name=?", [rows[0].songId, req.session.user]);
        return res.redirect('/');
    } else {
        return res.redirect('/');
    }
});

// POST for undoing your vote
router.post('/removeVote', async function (req, res, next) {
    if (req.session.LoggedIn) {
        const [rows] = await promisePool.query("SELECT hl21music.votes FROM hl21music WHERE songId=?", req.session.votedOn);
        let count = rows[0].votes / 1; // javascript moment / convert to int
        count = count - 1;
        const [row] = await promisePool.query("UPDATE hl21music SET votes=? WHERE songId=?", [count, req.session.votedOn]);

        const [votedOn] = await promisePool.query("UPDATE hl21users2 SET votedOn=? WHERE name=?", [null, req.session.user]);
        
        return res.redirect('/');
    } else {
        return res.redirect('/');
    }
});

module.exports = router;