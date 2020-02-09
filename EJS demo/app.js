var express = require("express");
var app = express();


app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("home");
});


app.get("/programming/:languages",function(req,res){
	var lan = req.params.languages;
	res.render("lang", {lang:lan} );
});

app.get("/plang",function(req,res){
	var language = [
	{ name:"C", author:"bob"},
	{name:"C++", author:"abhi"},
	{ name:"python", author:"saprey420"},
	 ];
	res.render("language", {language:language} );
});

app.listen(3000,function(){
	console.log("server started");
});