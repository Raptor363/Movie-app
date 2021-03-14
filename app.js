const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser')
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());

//Import Routes
const authRoute = require("./routes/auth");
const movieRoute = require("./routes/movies");
const commentRoute = require("./routes/comments");

dotenv.config();

const url = process.env.MONGOLAB_URI;

//Connect to DB
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    })
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("express-session")({
    secret:  process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

// to pass currentUser to every route   
app.use(function(req, res, next){
    req.user = req.cookies.jwt;
    res.locals.currentUser = req.user || null;
    next();
});

// Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/movies", movieRoute);
app.use("/api/movies", commentRoute);

app.listen(3000, () => console.log("Server running"));
