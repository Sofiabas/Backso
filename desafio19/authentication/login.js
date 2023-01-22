const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const UserModel = require(`../repository/models/user`);

const { isValidPassword } = require('../utils/utils');

const login = () => {
    
    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            const user = await UserModel.findOne({ username });
            if (!user) {
                return done(null, false);
            }
            if (!isValidPassword(user.password, password)) {
                return done(null, false);
            }
            return done(null, user);
        }
        catch (err) {
            done(err);
        }
    }));
}

module.exports = login;