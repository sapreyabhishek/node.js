var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("landing");
});

var campgrounds = [
		{name:"Night Sky", image:"https://cdn.pixabay.com/photo/2020/01/11/07/39/north-4756774__340.jpg"},
		{name:"Hill", image:"https://cdn.pixabay.com/photo/2016/02/09/16/35/night-1189929__340.jpg"},
		{name:"Bus", image:"https://cdn.pixabay.com/photo/2013/07/13/11/36/volkswagen-158463__340.png"},
		{name:"Adventure", image:"https://cdn.pixabay.com/photo/2017/08/06/18/33/barn-2594975__340.jpg"},
		{name:"Campfire",image:"https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242__340.jpg"},
		{name:"Nature" ,image:"https://cdn.pixabay.com/photo/2017/08/07/02/34/people-2598902__340.jpg"},
		{name:"Cabin fire" ,image:"https://cdn.pixabay.com/photo/2015/11/07/11/26/coffee-1031139__340.jpg"},
		{name:"Natureal" ,image:"https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242__340.jpg"},
		{name:"Bonfire" ,image:"https://cdn.pixabay.com/photo/2016/11/23/17/05/campfire-1853835__340.jpg"},
		{name:"Mashmallows",image:"https://cdn.pixabay.com/photo/2015/11/07/11/26/campfire-1031141__340.jpg"}
	]

app.get("/campgrounds",function(req,res){
	res.render("campground",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var newcamp = {name:name , image:image};
	campgrounds.push(newcamp);
	res.redirect("/campgrounds");
});

app.get("/addcampgrounds",function(req,res){
	res.render("new.ejs");
});

app.listen(4000,function(){
	console.log("yelpcamp started");
});