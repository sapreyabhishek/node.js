var express = require("express");
var router = express.Router();
var Campgrounds = require("../models/campgrounds");
var Comment = require("../models/comment");

router.get("/campgrounds/:id/comment/new",isLoggedIn,function(req,res){
	//find campground by id
	Campgrounds.findById(req.params.id, function(err,campground){
		if(err)
			console.log(err);
		else
			res.render("comments/new",{campground:campground});
	});
});

router.post("/campgrounds/:id/comment",function(req,res){
	Campgrounds.findById(req.params.id,function(err,campground){
		if(err)
			console.log(err);
		else
			{
				Comment.create(req.body.comment,function(err,comment){
					if(err)
						console.log(err);
					else
						comment.author.id = req.user._id;
						comment.author.username = req.user.username;
						comment.save();
						campground.comments.push(comment);
						campground.save();
						res.redirect("/campgrounds/"+campground._id);
				});
				
			}
		
	});
	
});

module.exports = router;

function isLoggedIn(req,res,next){
	if(req.isAuthenticated())
		return next();
	else
		res.redirect("/login");
}
