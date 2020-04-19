const express = require("express");
const router = express.Router();
const User =require('../models/User');
const passport=require('passport');
router.get("/users/signin", (req,res)=>
{
    res.render('users/signin.hbs');
}
);


router.get("/users/signup", (req,res)=>
{
    res.render('users/signup');

}
);

router.post('/users/signin',passport.authenticate('local', {
  
  successRedirect: "/notes",
    failureRedirect: "/users/signin"
 
  
})

);
router.post("/users/signup", async (req, res) =>
 {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
      errors.push({ text: "Passwords do not match." });
      console.log('Passwords do not match.');
    }
    if (password.length < 4) {
      errors.push({ text: "Passwords must be at least 4 characters." });
      console.log('Passwords must be at least 4 characters');

    }
    if (errors.length > 0) {
      res.render("users/signup", {
        errors,
        name,
        email,
        password,
        confirm_password
      });       
    } else {
       const emailUser = await User.findOne({email:email});
        const newUser= new User({name,email,password});
        if(emailUser)
        {
    errors.push({ text: "email already exist" });
      console.log('email already exist');
      res.redirect('users/signup');
        }

        else{
       newUser.password  = await newUser.encryptPassword(password);
       await newUser.save();
       
       res.redirect("/users/signin");
      
    }
    }
  });
router.get('/users/logout',(req,res)=>
{

 
  req.logout();
 

  res.redirect("/users/signin");

}
);

module.exports = router;
