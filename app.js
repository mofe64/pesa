const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const AppError = require('./util/AppError');
const GlobalErrorHandler = require('./controllers/errorController');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//passport config
require('./controllers/passport')(passport);
//routers
const viewRouter = require('./routers/viewRouter');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
//body parser
app.use(express.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

//express session middleware
app.use(
  session({
    secret: 'test',
    resave: true,
    saveUninitialized: true,
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');

  next();
});

//routes
app.use('/', viewRouter);

//ERROR HANDLER GLOBAL
app.use(GlobalErrorHandler);
module.exports = app;
