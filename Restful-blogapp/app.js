var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/restful_blogapp");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

var blogSchema = new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type:Date, default:Date.now}
});


var Blog = mongoose.model("Blog", blogSchema);

app.get("/",function(reeq,res){
	res.redirect("/blog");
});

app.get("/blog",function(req,res){
	Blog.find({},function(err,blogs){
		if(err)
			console.log(err);
		else
			res.render("index",{blogs:blogs});
	});
});

app.get("/blog/new",function(req,res){
	res.render("new");
});

app.post("/blog",function(req,res){
	
	Blog.create(req.body.blog,function(err,aa){
		if(err)
			res.render("new");
		else
			res.redirect("/blog");
		
	});
	
});

app.get("/blog/:id",function(req,res){
	Blog.findById(req.params.id,function(err,readmore){
		if(err)
			console.log(err);
		else
			res.render("show",{read:readmore});
	});
});

app.get("/blog/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,foundblog){
		if(err)
			console.log(err);
		else
			res.render("edit",{blog:foundblog});
	});
});

app.put("/blog/:id",function(req,res){
	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,aaa){
		if(err)
			console.log(err);
		else
			res.redirect("/blog/"+req.params.id);
	});
});

app.delete("/blog/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err)
			console.log(err);
		else
			res.redirect("/blog");
	});
});

app.listen(6001,function(){
	console.log("blogapp started");
});