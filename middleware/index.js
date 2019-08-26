//===Middleware==//
var middlewareObj = {};
var employee=require("../models/employee");


middlewareObj.checkemployeeOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {

        employee.findById(req.params.id, function (err, foundemployee) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundemployee.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        })


    } else {
        res.redirect("back");
    }
}
middlewareObj.checkOwnership = function(req,res,next)
    {
        if (req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, function (err, foundComment) {
                if (err) {
                    res.redirect("back");
                } else { 
                    if(foundComment.author.id.equals(req.user._id) && req.user.id.equals(Admin)){
                         next();
                     }else{
                         res.redirect("back");
                     }
                    
                }
            })
    
    
        } else {
           res.redirect("back");
        }
    }

middlewareObj.isLoggedIn=function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
module.exports = middlewareObj