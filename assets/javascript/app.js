var topics = ["turntables", "dj mixers", "vinyl records", "mixing and scratching"];
var term = "";
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=nwq9sHwwKUjRPNq6MBdCwQkANj867cEK&limit=10";
var termImage;
var state;

function renderButtons() {
  $("#buttons-view").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("type-term");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
  }
}

$(document).on("click", "#add-term", function(event) {
  event.preventDefault();
  var newTopic = $("#term-input").val().trim();
  topics.push(newTopic);
  renderButtons();
  $("#term-input").val("");
});

$(document).on("click", ".gif", function() {
  state = $(this).attr("data-state");
  id = $(this).attr("id");
  console.log(state);

  if (state == 'still'){
      var animatedSrc = $(this).attr("data-animate");
      $(this).attr("data-state", "animate");
      $(this).attr("src", animatedSrc);
  }
  else {
    var stillSrc = $(this).attr("data-still");
    $(this).attr("data-state", "still");
    $(this).attr("src", stillSrc);
  }
});

// Adding click event listen listener to all buttons
$(document).on("click", ".type-term", function() {
  $('#gifs-appear-here').empty();
  term = $(this).attr("data-name");


  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  term + "&api_key=nwq9sHwwKUjRPNq6MBdCwQkANj867cEK&limit=10";

  $.ajax({
  url: queryURL,
  method: "GET"
  })
  .done(function(response) {
    console.log(queryURL);

    console.log(response);
    var results = response.data;

    // Looping through each result item
    for (var i = 0; i < results.length; i++) {  
      console.log(i)
      var termDiv = $("<div class=\"col-sm-3 col-md-3 col-lg-3 gif-container mt mb\">");
      var p = $("<p>").text("Rating: " + results[i].rating);
      var termImage = $("<img>");

      // Setting the src attribute of the image to a property pulled off the result item
      termImage.attr("src", results[i].images.fixed_height_still.url);
      termImage.attr("data-still", results[i].images.fixed_height_still.url);
      termImage.attr("data-animate", results[i].images.fixed_height.url);
      termImage.attr("id",results[i].id)
      termImage.attr("data-state", "still");
      termImage.addClass("gif");
      termImage.addClass("img-responsive");

      // Appending the paragraph and image tag to the termDiv
      termDiv.append(p);
      termDiv.append(termImage);

      // Prependng the termDiv to the HTML page in the "#gifs-appear-here" div
      $("#gifs-appear-here").prepend(termDiv);
    }
  });
});

renderButtons();