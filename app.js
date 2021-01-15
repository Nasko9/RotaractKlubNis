// MODULES
var express = require('express');
var path = require('path');
var methodOverride = require('method-override');
var ejsMate = require('ejs-mate');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
const LocalStrategy = require('passport-local');

// PATH TO VIEWS FILE
var pocetna = require('./routes/pocetna');
var clanovi = require('./routes/clanovi');
var istorija = require('./routes/istorija');
var akcije = require('./routes/akcije');
var pridruziSe = require('./routes/pridruziSe');
var kontakt = require('./routes/kontakt');
var dogadjaji = require('./routes/dogadjaji');
var user = require('./routes/users');

// PATH TO MODELS FILE
var Akcija = require('./models/akcija');
var Dogadjaj = require('./models/dogadjaj');
var Clan = require('./models/clan');
var User = require('./models/user');

//CONECT TO DATABASE
mongoose.connect('mongodb://localhost:27017/rotaract_nis', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => {
        console.log("Database connected");
    })
    .catch(err => {
        console.log("Connection error");
        console.log(err);
    });

//USE EXPRESS
var app = express();

// VIEW ENGINE
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

// FROM MODULES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//SESSION
var sessionConfig = {
    secret: 'thisshouldeabettersecret',
    resave: false,
    saveUninitialized: true,
    cooke: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //? Datum je izrazen u milisekundama
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));

//FLASH MESSAGES
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// ROUTES
app.use('/', pocetna);
app.use('/clanovi', clanovi);
app.use('/istorija', istorija);
app.use('/akcije', akcije);
app.use('/pridruzi_se', pridruziSe);
app.use('/kontakt', kontakt);
app.use('/dogadjaji', dogadjaji);
app.use('/', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
  
// ERROR HANDLER
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error',{
        title: 'error',
        style:'',
        js:''
    });
});

// SERVER LISTEN
app.listen(3000, () => {
    console.log("Server listen on port 3000");
});