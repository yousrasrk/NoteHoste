/*const express = require("express");
const router = express.Router();
const Note=require('../models/Note');
const User=require('../models/User');
const Comment=require('../models/Comment');
const passport=require('passport');


const {isAuthenticated}=require('../helpers/auth');


router.get('/conmments',isAuthenticated,async (req,res)=>
{
   const notes = await Note.find().sort({date:'desc'});
   const com = await Note.find().sort({date:'desc'});
   console.log("neww");
var a=[];

notes.forEach(l => 
  {
    if(l.private=="public")
    {
     
      a.push(l,com);


   
    

 //const k =  Comment.find({note:a.l.id}).sort({date:'desc'});

 
    }
  })

    

 
  res.render("notes/public-notes", {a});

    
});
router.post("/comments/new-comment",isAuthenticated, (req,res)=>
{
const { comment,note} = req.body;

const  newComment=new Comment({comment,note});
newComment.user=req.user.id;
newComment.save();
 
res.redirect("/notepublic");
 
  
});

module.exports = router;*/