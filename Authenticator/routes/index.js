const express = require('express');
const createError = require('http-errors');
const router = express.Router();

//AUTHENTICATION modules
const passport=require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret'; //Could be a private-public key pair
const bcrypt = require('bcrypt');


passport.use('bcryptsignin',new LocalStrategy(function(username, password, cb) {
    //WORKING USER IS
    //username: razkey
    //password: secret
    if (username ==='razkey') {
        bcrypt.compare(password,'$2b$10$qnOOuLfSNZ.830v.8i9S2ORoBmRyWb.KFvCxaL2uCYHes5VdaJ8O6', function(err, res) {
            if (err) return cb(err);
            if (res === false) {
                return cb(null, false);
            } else {
                return cb(null, { username : username });
            }
        });
    }
}));

passport.use('token', new JWTStrategy(
    {
     secretOrKey:JWT_SECRET,
     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    function(token,done){
        return done(null, { username: token.username})
    }
));
//passport.authenticate('signin',{session: false}),
//passport.authenticate('bcryptsignin',{session:false}),
//POST signin
router.post('/signin',
    passport.authenticate('bcryptsignin',{session:false}),
    function(req, res, next) {
      res.json({
        token : jwt.sign(req.user,JWT_SECRET,{expiresIn:3600})
      });
    }
);

//TEST ENDPOINT to check authentication
router.get('/whoami',
    passport.authenticate('token',{session:false}),
    function(req,res,next){
        res.json({user:req.user});
    }
);

router.post('/register', function(req, res, next) {
    // Whatever verifications and checks you need to perform here
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            console.log(hash);
            if (err) return next(err);
            //newUser.password = hash; // Or however suits your setup
            // Store the user to the database, then send the response
        });
    });
    res.send("OK");
});


module.exports = router;
