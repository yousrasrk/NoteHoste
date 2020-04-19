const express = require('express');
const bodyParser = require("body-parser"); 
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const passport =require('passport');



const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// Initializations
const app = express();
require('./database');
require('./config/passport');




// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'mysecretapp',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));


// Global Variables
app.use((req, res, next) => {
 
  res.locals.user = req.user || null;
  next();
});
// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
   // console.log('Environment:', process.env.NODE_ENV);
  });



  // static files
app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;