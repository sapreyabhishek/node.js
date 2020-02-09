var express 				= require("express");
var app 					= express();
var User       				= require("./models/user");
var bodyParser 				= require("body-parser");
var mongoose 				= require("mongoose");
var Campgrounds 			= require("./models/campgrounds");
var Comment 				= require("./models/comment");
var passport 				= require("passport");
var localStrategy         	= require("passport-local");
var passportLocalMongoose 	= require("passport-local-mongoose");
var seedDB = require("./seed");
seedDB();

//cleaning routes
var commentsRoutes = require("./routes/comments");
var campgroundsRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_campv7");



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

//passport config
app.use(require("express-session")({
	secret:"But every one likes chubby porn-stars",
	resave:false,
	saveUninitialized:false	
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
})

app.use(commentsRoutes);
app.use(campgroundsRoutes);
app.use(indexRoutes);

app.listen(5005,function(){
	console.log("yelpcamp started");
});