const express = require("express");
const router = express.Router();
const Note=require('../models/Note');
const User=require('../models/User');
const Comment=require('../models/Comment');

const passport=require('passport');


const {isAuthenticated}=require('../helpers/auth');

router.get("/welcome",isAuthenticated, (req,res)=>
{
    res.render('index.hbs');
}
);

router.get("/", (req,res)=>
{
    res.render('index.hbs');
}
);


router.get("/contact",isAuthenticated, (req,res)=>
{
    res.render('notes/contact');
}
);
router.get("/contactus", (req,res)=>
{
    res.render('notes/contact');
}
);
router.post("/email", (req,res)=>
{
    const output=`
    you have a new contact request
    Contact detail:
    
    Name: ${req.body.name}
    Phone: ${req.body.tele}
    Email: ${req.body.email}
   
    Message
    ${req.body.message}
    `;
    console.log(req.body);

  

    //email
    require('dotenv').config();

const nodemailer = require('nodemailer');
const log = console.log;

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || 'abc@gmail.com', // TODO: your gmail account
        pass: process.env.PASSWORD || '1234' // TODO: your gmail password
    }
});

// Step 2
let mailOptions = {
    from: 'yousra2serroukh@gmail.com', // TODO: email sender
    to: 'yourita8@gmail.com', // TODO: email receiver
    subject: 'email from user NoteHost',
    text: output
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs');
    }
    return log('Email sent!!!');
});
    //email
    var message=[];
    message.push({text:"Email sent"});
    res.render("notes/contact",{message});
}
);
module.exports = router;
