var express = require("express");
var router = express.Router();
var Campgrounds = require("../models/campgrounds")

router.get("/campgrounds",function(req,res){
	Campgrounds.find({},function(err,allcampground){
		if(err)
			console.log(err);
		else
			res.render("campgrounds/index",{campgrounds:allcampground});
	});
});

router.post("/campgrounds",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newcamp = {name:name , image:image , description:desc};
	Campgrounds.create(newcamp,function(err,aa){
		if(err)
			console.log(err);
		else
			res.redirect("/campgrounds");
		
	});
	
});

//NEW route restful
router.get("/addcampgrounds",function(req,res){
	res.render("campgrounds/new");
});

//SHOW more info about 1 campground
router.get("/campgrounds/:id",function(req,res){
	Campgrounds.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
		if(err)
			console.log(err);
		else
			console.log(foundcampground);
			res.render("campgrounds/show",{campground:foundcampground});
	});
});

module.exports = router;
