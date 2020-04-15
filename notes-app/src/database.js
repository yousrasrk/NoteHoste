const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/notes-db-app',{
useCreateIndex:true,
useNewUrlParser: true ,
useUnifiedTopology: true,
useFindAndModify:false
}, (err) => {
    if (!err)
        console.log('MongoDB connection succeeded.');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;




