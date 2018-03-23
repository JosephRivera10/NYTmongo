//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var cheerio = require("cheerio");
var request = require("request");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
// var db = require("./models");

var db = mongoose.connection;

// Use morgan logger for logging requests
app.use(logger("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static('public'));

var databaseUri = 'mongodb://localhost/mongoHeadlines';
if (process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI);
}else{
  mongoose.connect(databaseUri);
}
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mongoHeadlines", {
  useMongoClient: true
});

// Sets up the handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routing/htmlRouting.js")(app);
require("./routing/apiRouting.js")(app);

db.on('error', function(err){
  console.log('Mongoose Error: ', err);
});

db.once('open', function(){
  console.log('Mongoose connection successful');
});
// Starts Server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});