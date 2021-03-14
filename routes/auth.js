const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

// REgister get
router.get("/register", (req, res) => {
    res.render("register");
});

// REgister post
router.post("/register", async (req, res) => {
    // Validate data before creating user
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checking if the user already exists
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send("Email already exists");

    // HASH passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try{
        const savedUser = await user.save();
        // res.send({user: user._id});
        res.redirect("/api/movies");
    } catch(err){
        res.status(400).send(err);
    }

});
// LOGIN GET
router.get("/login", (req, res) => {
    res.render("login");
});

// LOGIN
router.post("/login", async (req, res) => {
    // Validate the data
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checking if the user already exists
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send("Email not found");

    // Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Password is invalid");

    // Create and assign the token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

    //send the access token to the client inside a cookie
    res.cookie("jwt", token, {secure: false, httpOnly: true})
    // res.send()
    res.redirect("/api/movies");
})

// logout Logic
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/api/movies");
    
});

module.exports = router;