var topics = ["Frozen", "Inside Out", "How To Train Your Dragon", "Moana", "Coco", "Finding Nemo", "Lilo and Stitch", "The Lion King", "Peter Rabbit", "The Incredibles"]

$(document).ready(function() {
    function displayMovieGif() {

        var movie = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=kLPvlVa7eE710WhxcekpwiEvuY3MMS9P&limit=10";
    
        
        $.ajax ({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            $("#displayGifs").empty();

            var results = response.data
            console.log(response)

            for (var i = 0; i < results.length; i++) {

            var movieDiv = $("<div class='movie'>");

            var rating = results[i].results;

            var title = results[i].title;

            var pOne = $("<p>").text("Rating:" + rating + "||" + "Title:" + title);

            movieDiv.append(pOne);

            var giphyImage = $("<img>").attr("class", "gifImage").attr("data-state" , "still")

        giphyImage.attr("src", results[i].images.fixed_height_still.url);
        giphyImage.attr({'data-animate' : results[i].images.fixed_height.url});
        giphyImage.attr({'data-state' : "still"});
        giphyImage.attr({'data-still' : results[i].images.fixed_height_still.url});

       
        movieDiv.append(giphyImage);

        $("#displayGifs").prepend(movieDiv);
        }
    });
  }
  


  
  $("#displayGifs").on("click", ".gifImage", function () {

    var state = $(this).attr('data-state');

   
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
  });


  function renderButtons() {

  
    $("#movieButtonsDiv").empty();

   
    for (var i = 0; i < topics.length; i++) {

      var a = $("<button>");

     
      a.addClass("movie-btn");


      a.attr("data-name", topics[i]);

   
      a.text(topics[i]);

     
      $("#movieButtonsDiv").append(a);
    }
  }

  $(document).on("click", ".movie-btn", displayMovieGif);

 
  renderButtons();

  $("#add-movie").on("click", function(event) {
    event.preventDefault();

 
    var newMovie = $("#movie-input").val().trim();


    topics.push(newMovie);

    renderButtons();
  });


  $("#randomBtn").on("click", function() {

    $("#randomGif").empty();

  
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=eXssaD9YeTfAYOKoPh2z6l27EN6AsQD5&limit=1";

  
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      .then(function(response) {

     
        var imageUrl = response.data.image_original_url;

     
        var randomImage = $("<img>");

    
        randomImage.attr("src", imageUrl);

      
        $("#randomGif").prepend(randomImage);
      });
    });
  });
