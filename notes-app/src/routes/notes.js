const express = require("express");
const router = express.Router();
const Note=require('../models/Note');

const {isAuthenticated}=require('../helpers/auth');

router.get('/notes/edit/:id',isAuthenticated, async(req,res)=>
{
  const note= await Note.findById(req.params.id);
  console.log('hey0');

   res.render('notes/edit-note',{note});
}
);

router.post('/notes/edit-note/:id',isAuthenticated,async (req, res) => {
   
  const { title, description } = req.body;
  const  newNote=new Note({title,description});
  newNote.user=req.user.id;
  console.log('hola0');
  
  console.log(newNote);
  console.log('hola1');
  console.log('hey1');
 
    await Note.findByIdAndUpdate(req.params.id, { title, description },    {upsert: true, new: true}
      );
   
    res.redirect("/notes");
    console.log('hey2');
}
);

router.get('/notes',isAuthenticated,async (req,res)=>
{
 
    
  
   const notes = await Note.find({user:req.user.id}).sort({date:'desc'});
   res.render("notes/all-notes", { notes });
//console.log({notes});
    
});
router.get('/note',async (req,res)=>
{
 
    
  
   const notes = await Note.find().sort({date:'desc'});
   res.render("notes/all-notes", { notes });
console.log({notes});
    
});
router.get("/notes/add",isAuthenticated,(req,res)=>
{
   
    res.render('notes/new-note');
}
);

router.post("/notes/new-note",isAuthenticated, (req,res)=>
{
const { title, description } = req.body;
const errors = [];
if (!title) {
  errors.push({ text: "Please Write a Title." });
}
if (!description) {
  errors.push({ text: "Please Write a Description" });
}
if (errors.length > 0) {
  res.render("notes/new-note", {
    errors,
    title,
    description
  });

} else {
const  newNote=new Note({title,description});
newNote.user=req.user.id;
 newNote.save();
console.log(newNote);
res.redirect("/notes");
 }
  
});
router.get('/notes/delete/:id',isAuthenticated,async(req,res)=>
{    console.log('hey1');

    await Note.findByIdAndDelete(req.params.id);
    console.log('hey2');

    res.redirect("/notes");

});
module.exports = router;
