const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User'); 

passport.use(new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    // Match Email's User
    const user = await User.findOne({email: email});
    if (!user) {
      const errors = [];
        errors.push({ text: "incorrect email or password" });
      return done(null, false, { message: 'Not User found.' });
    } else {
      // Match Password's User
      const match = await user.matchPassword(password);
      if(match) {
        return done(null, user);
      } else {
        const errors = [];
        errors.push({ text: "incorrect email or password" });
        return done(null, false, { message: 'Incorrect Password.' });

      }
    }
  }));
  passport.serializeUser((user, done) => {
    const errors = [];
    errors.push({text: " Not Authorized"});
  
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      const errors = [];
  errors.push({text: " Not Authorized"});

      console.log(user);
      done(err, user);
    });
  });
  