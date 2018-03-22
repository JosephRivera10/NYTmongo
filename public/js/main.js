$("#btnObs").on("click", function(event){
  event.preventDefault();
  $.getJSON("/scrapeObs", function() { }).done(function(){
    $.getJSON("/articlesToday", function(data){
      console.log(data);
      $("#articlesHolder").empty();
      for (var i = 0; i < data.length; i++) {
        console.log("coucou");
        $("#articlesHolder").prepend('<div class="row"><div class="card" style= "width: 100%;"><div class="card-body"><h5 class="card-title">'+data[i].title+'</h5><h6 class="card-subtitle mb-2 text-muted">'+data[i].source+'</h6><p class="card-text">'+data[i].preview+'</p><a href="'+data[i].link+'" class="card-link" target="_blank">view article</a><button type="button" class="btn btn-outline-primary saveArt" data-id= "'+data[i]._id+'">Save Article</button></div></div>');
      }
    });
  });
});


// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Articles from l'obs\n" +
            "\n***********************************\n");

// Making a request for Le Monde
request("http://www.nouvelobs.com/politique/", function(error, response, html) {

  var $ = cheerio.load(html);

  var results = [];

  $("article.obs-article").each(function(i, element) {
    // Save the text of the element in a "title" variable
    var title = $(element).children("a").attr("title");
    var preview = $(element).children("p").text();
    var link = $(element).children("a").attr("href");

    results.push({
      title: title,
      preview: preview,
      link: link,
      source: "L'Obs"
    });
  });

  console.log(results);
});