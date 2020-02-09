var express = require("express");
var app = express();

app.get("/",function(req,res){
	res.send("hi there");
	
});

app.get("/bye",function(req,res){
	res.send(" GOODBYE");
	
});

app.get("/dog",function(req,res){
	res.send("MEOW");
	
});

app.get("/:subreddit/",function(req,res){
	var subreddit = req.params.subreddit;
	res.send("welcome to " + subreddit);
	
});

app.get("*",function(req,res){
	res.send("Search wrong url");
	
});

app.listen(6969, function(){
	console.log("server started");
	
});