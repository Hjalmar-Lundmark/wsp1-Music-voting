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
var session = require('express-session');
const { response } = require('express');
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    //LoggedIn: false,      // when removed keeps the user logged in even after restarting the page
}));
var validator = require('validator');
let responseErr = {}

// GET music page
router.get('/', async function (req, res, next) {
    //const [rows] = await promisePool.query("SELECT hl21music.*, hl21users2.name FROM hl21music JOIN hl21users2 WHERE hl21music.authorId = hl21users2.id ORDER BY hl21music.votes DESC");
    const [rows] = await promisePool.query("SELECT * FROM hl21music ORDER BY votes DESC");

    // checks if the user has voted before, thus stopping them from voting again
    if (req.session.LoggedIn) {
        const [Voted] = await promisePool.query("SELECT hl21users2.votedOn FROM hl21users2 WHERE name=?", req.session.user);
        console.log(Voted[0].votedOn);
        if (Voted[0].votedOn !== null) {
            req.session.voted = true;
            req.session.votedOn = Voted[0].votedOn;
        } else {
            req.session.voted = false;
        }
    }

    res.render('index.njk', {
        rows: rows,
        title: 'Music',
        user: req.session.user,
        loggedIn: req.session.LoggedIn,
        voted: req.session.voted, 
        votedOn: req.session.votedOn, 
    });
});

// GET and POST for making a new post
router.get('/new', async function (req, res, next) {
    if (!req.session.LoggedIn) {
        return res.redirect('/login');
    } else {
        res.render('new.njk', {
            title: 'Make a Post',
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
        responseErr.err.push('Behöver vara en spotify låt länk');
    }

    if (responseErr.err.length === 0) {
        //let spotify = "https://open.spotify.com/track/1xEV982DYbeabpl8HYcTLv?go=1&sp_cid=8e099f9f21238588ba475fc169228efd&utm_source=embed_player_p&utm_medium=desktop"
        let spotify = content
        let part = spotify.split("/");
        let songId = part[4].split("?");

        // sanitizing is not needed because I have already edited the string enough
        const [rows] = await promisePool.query("INSERT INTO hl21music (authorId, songId, votes) VALUES (?, ?, ?)",
            [req.session.userId, songId[0], 0]);
        res.redirect('/');
    } else {
        res.redirect('/new');
    }
});

//GET profile
router.get('/profile', async function (req, res, next) {
    if (req.session.LoggedIn) {
        const [info] = await promisePool.query("SELECT hl21users2.id, hl21users2.name, hl21users2.Desc, hl21users2.createdAt FROM hl21users2 WHERE name=?", req.session.user);
        return res.render('profile.njk', {
            title: 'Profile',
            user: req.session.user,
            info,
            loggedIn: req.session.LoggedIn,
        });
    } else {
        return res.redirect('/login');
    }
});

//GET and POST login
router.get('/login', function (req, res, next) {
    if (req.session.LoggedIn) {
        return res.redirect('/profile');
    } else {
        res.render('login.njk', {
            title: 'Login',
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
        responseErr.err.push('Username is required');
    }
    if (password === "") {
        responseErr.err.push('Password is required');
    }
    if (responseErr.err.length === 0) { // I feel like this is a bit too much spagetti
        const [users] = await promisePool.query("SELECT * FROM hl21users2 WHERE name=?", username);
        if (users.length > 0) {
            bcrypt.compare(password, users[0].password, function (err, result) {
                if (result) {
                    req.session.user = username;
                    req.session.userId = users[0].id;
                    req.session.LoggedIn = true;
                    return res.redirect('/');
                } else {
                    responseErr.err.push('Invalid username or password');
                    res.redirect('/login');
                }
            });
        } else {
            responseErr.err.push('Wrong credentials');
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
});


//GET and POST register
router.get('/register', async function (req, res) {
    if (req.session.LoggedIn) {
        return res.redirect('/profile');
    } else {
        res.render('register.njk', { 
            title: 'Register',
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
        responseErr.err.push('Username is required');
    }
    if (password === "") {
        responseErr.err.push('Password is required');
    }
    if (password.length < 8) {
        responseErr.err.push('Password needs atleast 8 characters');
    }
    if (password !== passwordConfirmation) {
        responseErr.err.push('Passwords need to match');
    }
    
    if (responseErr.err.length === 0) {
        const [testing] = await promisePool.query("SELECT * FROM hl21users2 WHERE name=?", username);

        if (testing.length > 0) {
            responseErr.err.push('Username is already taken');
            return res.redirect('/register');
        }

        await bcrypt.hash(password, 10, async function (err, hash) {
            const [rows] = await promisePool.query('INSERT INTO hl21users2 (name, password) VALUES (?, ?)', [username, hash])
            req.session.user = username;
            const [users] = await promisePool.query("SELECT * FROM hl21users2 WHERE name=?", username);
            req.session.userId = users[0].id;
            req.session.LoggedIn = true;
            return res.redirect('/'); // Logs the user in after account is created
        });
    } else {
        res.redirect('/register');
    }
});


//Delete account
router.post('/delete', async function (req, res, next) {
    if (req.session.LoggedIn) {
        req.session.LoggedIn = false;
        await promisePool.query('DELETE FROM hl21users2 WHERE name=?', req.session.user);
        res.redirect('/');
    } else {
        return res.status(401).send("Access denied");
    }
});

//Log out
router.post('/logout', async function (req, res, next) {
    if (req.session.LoggedIn) {
        req.session.LoggedIn = false;
        res.redirect('/');
    } else {
        return res.status(401).send("Access denied");
    }
});

router.post('/vote', async function (req, res, next) {
    if (req.session.LoggedIn) {
        const {rowId} = req.body; // Temp(?) solution to make voting work
        const [rows] = await promisePool.query("SELECT hl21music.votes, hl21music.songId FROM hl21music WHERE id=?", rowId);
        console.log(rows);
        let count = rows[0].votes / 1; // javascript moment
        count = count + 1;

        const [row] = await promisePool.query("UPDATE hl21music SET votes=? WHERE id=?", [count, rowId]);

        // confirm vote and disable voting again
        const [votedOn] = await promisePool.query("UPDATE hl21users2 SET votedOn=? WHERE name=?", [rows[0].songId, req.session.user]);
        return res.redirect('/');
    } else {
        return res.redirect('/');
    }
});

// POST for getting rid of your vote?

module.exports = router;