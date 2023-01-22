const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const UserModel = require(`../repository/models/user`);

const { createHash } = require('../utils/utils');

const signup = () => {
    passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            const user = await UserModel.findOne({ username });
            if (user) {
                return done(null, false);
            }

            const newUser = new UserModel();
            newUser.username = username;
            newUser.password = createHash(password); 
            newUser.email = req.body.email;
        
            const userSave = await newUser.save();
            return done(null, userSave);
        }
        catch (err) {
            done(err);
        }
    }));
}

module.exports = signup;