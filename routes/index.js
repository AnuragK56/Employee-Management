var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");

router.get("/", function (req, res) {
    res.render("landing");
});

//===AUTHENTICATE ROUTES===//

//===register===//
router.get("/register", function (req, res) {
    res.render("register");
});
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.redirect("register")
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/employee")
        })
    })

});


//====login==//
router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/employee",
    failureRedirect: "/login"
}), function (req, res) {
    res.send("login will be soon available");
});


//===logout===//
router.get("/logout", function (req, res) {
    req.logOut();
    res.redirect("/employee");
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports=router;
