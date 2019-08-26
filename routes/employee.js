var express = require("express");
var router = express.Router();
var employee = require("../models/employee");

var middleware=require("../middleware/index");


router.get("/", function (req, res) {
    employee.find({}, function (err, allemployee) {
        if (err) {
            console.log("Error");
            console.log(err);
        }
        else {
            res.render("employee/index", { employee: allemployee, currentUser: req.user });
        }
    })
});
router.post("/", middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var age = req.body.age;
    var PhoneNumber= req.body.PhoneNumber;
    var position= req.body.position;
    var Location=req.body.Location;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newemployee = { name: name, age:age, Location:Location,position:position, PhoneNumber:PhoneNumber,author: author }
    employee.create(newemployee, function (err, newlycreated) {
        if (err) {
            console.log("Error");
            console.log(err);
        }
        else {
            console.log(newlycreated);
            res.redirect("/employee");
        }
    })

});

//===New employee==//
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("employee/new");
});
router.post("/:id", function (req, res) {
    //Find and update
    employee.findByIdAndUpdate(req.params.id, req.body.employee, function (err, Updatedemployee) {
        if (err) {
            res.redirect("/employee");
        } else {
            res.redirect("/employee/" + req.params.id);
        }

    })
});
//Show ROute
router.get("/:id", function (req, res) {
    employee.findById(req.params.id).populate("comments").exec(function (err, foundemployee) {
        if (err) {
            console.log("Error");
        }
        else {
            console.log(foundemployee);
            res.render("employee/show", { employee: foundemployee });
        }
    });

});
//===Edit employee===//

router.get("/:id/edit",middleware.checkemployeeOwnership, function (req, res) {
    employee.findById(req.params.id, function (err, foundemployee) {
        if(err){
            req.flash("error","You need to be logged in to do that!");
        }
    else{
          res.render("employee/edit", { employee: foundemployee });
    }
               });
});
router.put("/:id",middleware.checkemployeeOwnership,function(req,res){
    employee.findByIdAndUpdate(req.params.id,req.body.employee, function (err, updatedemployee) {
        if(err){
            res.redirect("/employee");
        }else{
            res.redirect("/employee/"+req.params.id);
        }
       });
})

//===Delete employee===//
router.delete("/:id",middleware.checkemployeeOwnership, function (req, res) {
    employee.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            res.redirect("/employee");
        } else {
            res.redirect("/employee");
        }
    })

});



module.exports = router;
