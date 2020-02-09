var mongoose = require("mongoose");
var Campgrounds = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
	{
		name:"Provincial Park",
		image:"https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242__340.jpg",
		description:"this is very beautiful park"
	},
	{
		name:"evrevy5etv",
		image:"https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
		description:"wesrrtynkrdtw  twywvw"
	},
	{
		name:"asdfg",
		image:"https://q-xx.bstatic.com/xdata/images/hotel/840x460/178852959.jpg?k=e968b270d8259ebbdedad907a5fedb57134ce3a111e276f9dcfa8aaf3dc987c5&o=",
		description:"asdfghjkhugft"
	}



]

function seedDB(){
	//remove all campgrounds
	Campgrounds.remove({},function(err){
		if(err)
			console.log(err);
		console.log("remove all campgrounds");
		//add campgrounds
	data.forEach(function(seed){
		Campgrounds.create(seed,function(err,campgrounds12){
			if(err)
				console.log(err);
			else
				{
					console.log("added a campground");
					//creating comment
					Comment.create(
						{
							text:"this place is great but i wish there was internet",
							author:"Homer"
						},function(err,comment){
							if(err)
								console.log(err);
							else
								{
									campgrounds12.comments.push(comment);
									campgrounds12.save();
									console.log("created comment")	
								}
						});
				}
		});
		
	});
	});
	
	
}

module.exports = seedDB;