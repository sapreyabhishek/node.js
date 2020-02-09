var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campgrounds = require("./models/campgrounds");
var Comment = require("./models/comment");
var seedDB = require("./seed");
seedDB();

mongoose.connect("mongodb://localhost/yelp_campv4");



//Campgrounds.create({
	//name:"Travel Sunrise", image:"https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242__340.jpg",
	//description:"This is very beautifull place for your vocation, you really enjoy alot"
	
 //},function(err,campground){
//	if(err)
	//	console.log(err);
	//else
	//	console.log(campground);
//});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("landing");
});



app.get("/campgrounds",function(req,res){
	Campgrounds.find({},function(err,allcampground){
		if(err)
			console.log(err);
		else
			res.render("campgrounds/index",{campgrounds:allcampground});
	});
});

app.post("/campgrounds",function(req,res){
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
app.get("/addcampgrounds",function(req,res){
	res.render("campgrounds/new");
});

//SHOW more info about 1 campground
app.get("/campgrounds/:id",function(req,res){
	Campgrounds.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
		if(err)
			console.log(err);
		else
			console.log(foundcampground);
			res.render("campgrounds/show",{campground:foundcampground});
	});
});

app.get("/campgrounds/:id/comment/new",function(req,res){
	//find campground by id
	Campgrounds.findById(req.params.id, function(err,campground){
		if(err)
			console.log(err);
		else
			res.render("comments/new",{campground:campground});
	});
});

app.post("/campgrounds/:id/comment",function(req,res){
	Campgrounds.findById(req.params.id,function(err,campground){
		if(err)
			console.log(err);
		else
			{
				Comment.create(req.body.comment,function(err,comment){
					if(err)
						console.log(err);
					else
						campground.comments.push(comment);
						campground.save();
						res.redirect("/campgrounds/"+campground._id);
				});
				
			}
		
	});
	
});

app.listen(5002,function(){
	console.log("yelpcamp started");
});