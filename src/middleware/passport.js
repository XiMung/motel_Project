const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
var cons = require("../../cons");
const {ExtractJwt} = require("passport-jwt")
const {userModel} = require("../models/user.model");

passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: cons.keyToken
}, async (payload, done) => {
    try {
        // console.log('payload', payload);
        var user = await userModel.findOne({ username: payload.email })
        if (!user) return done(null, false);
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))
