
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var employee = require("./models/employee");
var passport = require("passport");
var methodOverride=require("method-override");
var LocalStatergy = require("passport-local");
var User = require("./models/user")


//===Requiring ROUTES===//
var employeeRoutes=require("./routes/employee");
var indexRoutes=require("./routes/index");

app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


mongoose.connect("mongodb://localhost/employee", { useNewUrlParser: true });




//===Passport Routes===///
app.use(require("express-session")({
    secret: "Rusty wins the cutest dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStatergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
}); 


app.use(indexRoutes);
app.use("/employee",employeeRoutes);


app.listen(3000, function (req, res) {
    console.log("Server started Anurag !!");
});