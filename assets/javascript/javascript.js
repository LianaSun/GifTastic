$(document).ready(function() {

    var topics = ["Moana", "Frozen", "Coco", "How To Train Your Dragon", "Inside Out", "Finding Nemo",]
     var results;
     //var giphyURL = "https://api.giphy.com/v1/gifs/trending?api_key=6yxzdI58IBG7adsyR6nW2LUXgOHHahMu";
        
            function makeButtons() {
        
                $("#movieButton").empty();
        
                for (i = 0; i < topics.length; i++) {
                    
                    var b = $("<button>");
        
                    b.addClass("character-btn");
                    b.attr("data-name", topics[i]);
                    b.text(topics[i]);
        
                    $("#movieButton").append(b);
                };
            };
        
            $("#add-movie").on("click", function(event) {
        
                event.preventDefault();
        
                var character = $("#movieInput").val().trim();
        
                topics.push(character);
                $("#movieInput").val("");
        
                makeButtons();
        
                console.log(topics); 
            });
        
            makeButtons();
        
            //FUNCTION FOR GRABBING GIPHY API CONTENT
        
              function dataPull() {
        
                 var characterName = $(this).attr("data-name");
                 var characterStr = characterName.split(" ").join("+");
                 var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";
        
                 $.ajax({
                url: giphyURL,
                method: "GET"
              }).done(function(response) {
                
                console.log(giphyURL);
                console.log(response);
        
                results = response.data;
        
                $("#gifs").empty();
                for (var i = 0; i < results.length; i++) {
                    
                    var characterDiv = $("<div>");
                    var para = $("<p class='rating'>").text("Rating: " + results[i].rating);
                    var characterImage = $("<img>");
        
                    para.addClass("rating-text")
                    
                  characterImage.addClass("image-gifs")
                    characterImage.attr("src", results[i].images.fixed_height_still.url);
                    characterImage.attr("data-state", "still");
                  characterImage.attr("data-position", i);
        
                    movieDiv.append(para);
                    movieDiv.append(movieImage);
                    movieDiv.addClass("individual-gifs")
        
                  $("#gifs").prepend(characterDiv);
        
                }; 
              }); 
          
            };
        
          // Use document on click function to apply function for elements AFTER the page has loaded
        
            $(document).on("click", ".movieButton", dataPull);
        
            function gifAnimation() {
              var state = $(this).attr("data-state");
              var position = $(this).attr("data-position"); //will return a string
              position = parseInt(position); //string to integer
        
              console.log(results[position].images.fixed_height.url);
              console.log(position);
        
              if (state === "still") {
                console.log("we're here");
                $(this).attr("src", results[position].images.fixed_height.url);
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", results[position].images.fixed_height_still.url);
                $(this).attr("data-state", "still");
              }
            };
        
          $(document).on("click", ".image-gifs", gifAnimation);
        
        });