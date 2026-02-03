
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const pool = require('./pool');

function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await getUserByUsername(username); // Await the result of getUserByUsername

            if (!user) {
                console.log('No user found with the provided username.');
                return done(null, false, { message: 'No user with that username' });
            }

            console.log('User found:', user); // Log the user object
            console.log('Password to compare:', password);
            console.log('Stored hashed password:', user.password);

            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (e) {
            console.error('Error during authentication:', e);
            return done(e);
        }
    };




    passport.use(new localStrategy({ usernameField: 'username' },
        authenticateUser))


    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        try {
            const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
            done(null, result.rows[0]);
        } catch (err) {
            done(err, null);
        }
    });

}

module.exports = initialize 