if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const pool = require('./pool')


const express = require('express')
const cors = require('cors')
const app = express()
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const bodyParser = require('body-parser');




const initailizePassport = require('./passport-congif')
const passport = require('passport')
initailizePassport(
    passport,
    async username => {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    },
    async id => {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }
);

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow your React app's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the methods you want to allow
    credentials: true // Enable cookies and sessions to be sent
}));


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.set('view-engine', ' ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

// start up passport sessions
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// app.get('/', checkAuthenticated, (req, res) => {
//     res.render('index.ejs', { name: req.user.name })
// })



app.get('/login', checkNotAuthenticated, (req, res) => {
    res.status(200).json({ message: "You can now access the login page" });
});


app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/', // sends to home page on login,, so i need to have this as my start page
    failureRedirect: '/login',
    failureFlash: true
}))

// dont need this becaues REACT will handle rendering things no the client side for me
// app.get('/register', checkNotAuthenticated, (req, res) => {
//     res.render('register.js')
// })

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        console.log("Data here", req.body)
        await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2)',
            [username, password]
        );

        res.redirect('/login')
    } catch (err) {
        console.error(err);

        res.redirect('/register')

    }
    console.log();

})

app.delete('/logout', (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});

// THis prevents now logged in useres from accesing the start page
function checkAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
        return res.redirect('/')
    }

    next()
}

// App Set //
const PORT = process.env.PORT || 5005;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});


pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected:', res.rows);
    }
});
