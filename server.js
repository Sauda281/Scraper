var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path =require("path");

var Note = require("./models/Note.js");
var Article = require("./models/Article.js")

var cheerio = require("cheerio");
var axios = require("axios");

mongoose.Promise = promise;

var port = process.env.PORT || 3000

var app = express();
 

// Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static("public"));

// set handlebrs
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main",
    partialDir: path.join(__dirname, "/views/layouts/partials")
}));
app.set("view engine", "handlebars");

mongoose.connect("mongodb://heroku");

var db = mongoose.connection;

db.on("error", function(error){
    console.log("Mongoose Error:", error);
});

db.once("open", function(){
    console.log("Mongoose connection successful.");
});
her
// routes

app.get("/", function(req, res){
    Article.find({"saved": false}, function(error, data){
        var hbsObject = {
            article: data
        };
        console.log(hbsObject);
        res.render("home", hbsObject);
    });
});
app.get("/scrape", function(req, res){
    
})
// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from reddit's webdev board:" +
            "\n***********************************\n");

// Making a request via axios for reddit's "webdev" board. We are sure to use old.reddit due to changes in HTML structure for the new reddit. The page's Response is passed as our promise argument.
axios.get("https://old.reddit.com/r/webdev").then(function(response) {

  // Load the Response into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  var results = [];

  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  $("p.title").each(function(i, element) {

    // Save the text of the element in a "title" variable
    var title = $(element).text();

    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    var link = $(element).children().attr("href");

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});
