var express =require ('express');
var app = express();
var bodyParser = require("body-parser");

var friends = ["bob","tiger","moti","painkra","panikara"];

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("home");
});

app.get("/friends",function(req,res){
	
	res.render("friends",{friends:friends});
});

app.post("/addfriend", function(req,res){
	var newadd = req.body.newfriend;
	friends.push(newadd);
	res.redirect("/friends");
});

app.listen(1000,function(){
	console.log("server start");
});