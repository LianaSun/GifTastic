//Create an array with kids movie titles

var movies = ["How To Train Your Dragon", "Finding Nemo", "Moana", "Frozen", "Toy Story", "Peter Rabbit", "Zootopia"];

$(document).ready(function(){

 //Display MoviesGif function re-renders the HTML to display related content 
 function displayMovieGif(){

  //Movie Variable
  var movie = $(this).attr("data-name");

  //API URL to be queried
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "kLPvlVa7eE710WhxcekpwiEvuY3MMS9P&limit=10";

  //Create an AJAX call for the specific movie buttonbeing clicked on
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){

    //console.log(response)

    //Clear gifsDisplay div of existing images 
    $("#gifsDisplay").empty();

    var results = response.data

    //Loop through each response
    for (var i = 0; i < results.length; i++) {

      //Create a div to hold each movie title
      var movieDiv = $("<div class = 'movie'>");

      //Store the rating data
      var rating = results[i].rating;

      //Store the title data
      var title = results[i].title;

      //Create an element that displays both the rating and the title
      var pOne = $("<p>").text("Rating:" + rating + "||" + "Title:" + title);

      //Display the rating
      movieDiv.append(pOne);

      //Create an element to hold the image
      var giphyImage = $("<img>").attr("class", "gifImage").attr("data-state", "still")

      //Start/Stop images function
        giphyImage.attr("src", results[i].images.fixed_height_still.url);
        giphyImage.attr({'data-animate' : results[i].images.fixed_height.url});
        giphyImage.attr({'data-state' : "still"});
        giphyImage.attr({'data-still' : results[i].images.fixed_height_still.url});

      //Appends the image
      movieDiv.append(giphyImage);

      //Put image in the div
      $("#gifsDisplay").prepend(movieDiv);
    }
  });
}

//Click function to start and stop animation
$("#gifsDisplay").on("click", ".gifImage", function (){

  var state = $(this).attr('data-state');

  //If state is still, use the animated image URL
  //Else, use the still image URL
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("date-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
  });

  //Function to display movie data

  function renderButtons(){

  //Delete movies prior to addting the buttons (or buttons repeat when one is added)
  $("#movieButtonDiv").empty();

  //Looping through the array of movies
  for(var i = 0; i < topics.length; i++){

  //Dynamically create buttons for each movie in the array
  var a = $("<button>");

  //Adding a class of movie-btn
  a.addClass("movie-btn");

  //Adding data-attribute 
  a.attr("data-name", topics[i]);

  //Provide the inital button text
  a.text(topics[i]);

  //Add the button to the movieButtonDiv
  $("#movieButtonDiv").append(a);
  }
}

//Add click event listener to all elements with class of "movie-btn"
$(document).on("click", ".movie-btn", displayMovieGif);

//Calling the renderButtons fuction to display initial buttons
renderButtons();

//Function to handle events when movie button is clicked
$("#add-movie").on("click", function(event){
  event.preventDefault();

//Grab input from text box
var newMovie = $("#movie-input").val().trim();

//Add movie from textbox to movie array
topics.push(newMovie);

//Call renderButtons to process movie array with new movie added
renderButtons();
});

//Function to display random gifs
$("#randomBtn").on("click", function() {

  $("#randomGif").empty();

  // API URL to get a random gif image
  var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=eXssaD9YeTfAYOKoPh2z6l27EN6AsQD5&limit=1";

  // AJAX call to get the data from the API endpoint
  $.ajax({
    url: queryURL,
    method: "GET"
  })

  // The API request has completed
    .then(function(response) {

    // Get image URL from API
      var imageUrl = response.data.image_original_url;

      // Create a virtual jQuery image
      var randomImage = $("<img>");

      // Apply attributes to jQuery image
      randomImage.attr("src", imageUrl);

      // Append jQuery Image to actual DOM
      $("#randomGif").prepend(randomImage);
    });
  });

});