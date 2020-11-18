const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');

// import schema to use with jwt
const User = mongoose.model('users');
// import DB secret key
const secretkey = process.env.JWT_SECRET;
// const secretkey = require('../config/myDbUrl').secretOrKey

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretkey;

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findById(jwtPayload.id)
      .then((person) => {
        if (person) {
          return done(null, person);
        }
        return (null, false);
      })
      .catch((err) => {
        // console.log(err)
      });
  }));
};
