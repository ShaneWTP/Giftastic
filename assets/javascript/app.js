//create array for Ghilbli movies that renders on page load
$(document).ready(function () {
	var movies = ["Ponyo", "Howl's Moving Castle", "Princess Mononoke", "My Neighbor Totoro", "Porco Rosso", "Spirited Away", "Kiki's Delivery Service", "Castle in the Sky"];
//Function that creates existing buttons
	function renderButtons() {
		$("#movie-buttons").empty();
		for (i = 0; i < movies.length; i++) {
			$("#movie-buttons").append("<button class='btn btn-success' data-movie=" + movies[i] + ">" + movies[i] + "</button>");
		}
	}
//calling function on page load
	renderButtons();
//on click event that will create new button
	$("#add-movie").on("click", function () {
		event.preventDefault();
		var movie = $("#movie-input").val().trim();
		movies.push(movie);
		renderButtons();
		return;
	});

//function that will display 10 gifs with added info when specific button is clicked
	$("button").on("click", function () {
		var movie = $(this).attr("data-movie");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			movie + "&api_key=SwfoQmys0bxNPKHHET2gy5T5gKME0YQ3&limit=10"
//ajax call to get info ang gifs from giphy
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			var results = response.data;
			$("#movies").empty();
			for (var i = 0; i < results.length; i++) {
				var movieDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var movieImg = $("<img>");
//add attributes to each gif result to display pictures and needed information
				movieImg.attr("src", results[i].images.original_still.url);
				movieImg.attr("data-still", results[i].images.original_still.url);
				movieImg.attr("data-animate", results[i].images.original.url);
				movieImg.attr("data-state", "still");
				movieImg.attr("class", "gif");
				movieDiv.append(p);
				movieDiv.append(movieImg);
				$("#movies").append(movieDiv);
			}
		});
	});
//function that will change gif states from frozen to moving
	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
    }
    //on click event for gif state
	$(document).on("click", ".gif", changeState);

});