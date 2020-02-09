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

mongoose.connect("mongodb://localhost/yelp_campv5");



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

app.get("/campgrounds/:id/comment/new",isLoggedIn,function(req,res){
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

//Auth routes
//show register form
app.get("/register",function(req,res){
	res.render("register");
});

//post  route of register
app.post("/register",function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err,user){
		if(err)
		{console.log(err);
			res.redirect("/register");
		}
		
				passport.authenticate("local")(req,res,function(){
					res.redirect("/campgrounds");
				});
			
	});
});

//login route
app.get("/login",function(req,res){
	res.render("login");
});
//handling login logic
app.post("/login",passport.authenticate("local",{
		successRedirect:"/campgrounds",
		failureRedirect:"/login"
	}),function(req,res){	
});

app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated())
		return next();
	else
		res.redirect("/login");
}


app.listen(5003,function(){
	console.log("yelpcamp started");
});