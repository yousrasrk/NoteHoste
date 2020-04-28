const express = require("express");
const router = express.Router();
const Note=require('../models/Note');
const User=require('../models/User');
const Comment=require('../models/Comment');

const passport=require('passport');


const {isAuthenticated}=require('../helpers/auth');



router.get('/public-notes',isAuthenticated,async (req,res)=>
{
   const notes = await Note.find().sort({date:'desc'});


 a=[];
 b=[];
notes.forEach(l => 
  {
    if(l.private=="public")
    {
      a.push(l);
    }
  })
  const comments = await Comment.find().sort({date:'desc'});


  comments.forEach(l => 
    {
      
        b.push(l);
      
    })
    console.log({b});

  res.render("notes/public-notes",{a});  
});

router.get("notes/Comment",isAuthenticated, async(req,res)=>
{

 res.send("ok");
});

router.post("/Comment/:id", isAuthenticated,async(req,res)=>
{
const note= await Note.findById(req.params.id);
const comment=new Comment();
comment.content=req.body.content;
comment.note=note._id;
await comment.save();
note.comments.push(comment._id);

note.text.push(comment.content);
console.log(note.text);
await note.save();

   res.redirect("/public-notes");
}
);

router.get('/notes/edit/:id',isAuthenticated, async(req,res)=>
{

  const note= await Note.findById(req.params.id);

 
   res.render('notes/edit-note',{note});
}
);

router.post('/notes/edit-note/:id',isAuthenticated,async (req, res) => {
   
  const { title, description,day,private } = req.body;
  const update=[];
  if (!title) {
    update.push({ text: "Please Write a Title." });
  }
  if (!description) {
    update.push({ text: "Please Write a Description" });
  }
  if (!day) {
    update.push({ text: "Please Write a Description" });
  }
  if (!private) {
    update.push({ text: "Please Write a Description" });
  }
  if (update.length > 0) {
    res.redirect("/notes");
  }
  else{
  const  newNote=new Note({title,description,day,private});
  newNote.user=req.user.id;
 
 
    await Note.findByIdAndUpdate(req.params.id, { title, description,day,private },    {upsert: true, new: true}
      );
   
    res.redirect("/notes");
  }
  
}
);

router.get('/notes',isAuthenticated,async (req,res)=>
{

  const searchUser= await User.findById(req.user.id);
  console.log(searchUser);
  var x= new Date();
   const t=[];
   const d=[];

  const errors = [];
  
  const notes = await Note.find({user:req.user.id}).sort({date:'desc'});
  
   notes.forEach(l => 
    {
      
     
        
        var day= l.day.getDate();
       
     

        
       
        if(l.day.getDate()==x.getDate())
        {
          console.log(l.day.getDate());
          
      

         errors.push({ text:"you have tasks to do today: "});
         t.push(l.title);
         d.push(l.day.getDate());
        
        
        }
      
    })
 
   res.render("notes/all-notes", { notes ,searchUser,errors,t,d});
  
/*console.log({notes});
console.log({searchUser});*/

    
});

router.get("/notes/add",isAuthenticated,(req,res)=>
{
   
    res.render('notes/new-note');
});



router.post("/notes/new-note",isAuthenticated, (req,res)=>
{
const { title, description ,day,private} = req.body;
const errors = [];
if (!title) {
  errors.push({ text: "Please Write a Title." });
}
if (!description) {
  errors.push({ text: "Please Write a Description" });
}
if (!day) {
  errors.push({ text: "Please Write a Description" });
}
if (!private) {
  errors.push({ text: "Please Write a Description" });
}
if (errors.length > 0) {
  res.render("notes/new-note", {
    errors,
    title,
    description
  });

} else {
  const messages=[];

const  newNote=new Note({title,description,day,private});
newNote.user=req.user.id;
 newNote.save();
 messages.push({text: " Note Added Successfully"});
 if (messages.length > 0) {
 
 }
res.redirect("/notes");
 }
  
});
router.get('/notes/delete/:id',isAuthenticated,async(req,res)=>
{    

    await Note.findByIdAndDelete(req.params.id);
   

    res.redirect("/notes");

});


module.exports = router;
