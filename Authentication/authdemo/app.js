var express 				= require("express");
var mongoose 				= require("mongoose");
var User       				= require("./models/user");
var passport 				= require("passport");
var bodyParser 				= require("body-parser");
var localStrategy         	= require("passport-local");
var passportLocalMongoose 	= require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/auth_demo");

var app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({
	secret:"Lana Rhodes is most popular porn star",
	resave:false,
	saveUninitialized:false	
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res){
	res.render("home");
});

app.get("/secret",isLoggedIn,function(req,res){
	res.render("secret");
});


//routes
//sign up form

app.get("/register",function(req,res){
	res.render("register");
});

//post  route of register
app.post("/register",function(req,res){
	req.body.username
	req.body.password
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err)
		{console.log(err);
			res.redirect("/register");
		}
		
				passport.authenticate("local")(req,res,function(){
					res.redirect("/secret");
				});
			
	});
});

app.get("/login",function(req,res){
	res.render("login");
});

app.post("/login",passport.authenticate("local",{
	successRedirect:"/secret",
	failureRedirect:"/login"
}),function(req,res){	
});

app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated())
		return next();
	else
		res.redirect("/login");
}

app.listen(8000,function(){
	console.log("started....");
});