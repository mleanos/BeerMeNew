// post from DOM
$(document).ready(function() {


    $('.beer_search').on('click', function() {
        event.preventDefault();
        var clientId = "&client_id=43D9E7E6E3B9C50C285014E7BE74DDCBE021FA00";
        var clientSecret = "&client_secret=E2DFC619E166E32349A9C8E784395C5702BEDCBB";
        var query = "q="
        var url = "https://api.untappd.com/v4/";
        var searchBeer = "search/beer?";
        var baseUrl = "https://api.untappd.com/v4/";
        var thebeer = $('.theBeer').val();
        // console.log("Here"+thebeer)
          $.ajax({url: baseUrl + searchBeer + query + thebeer + clientId + clientSecret, success: function(result){
              // console.log("ajax " + JSON.stringify(result))
              function displayBeers(){
                $('#display').empty();
                // console.log(JSON.stringify(result.response.beers.items));
                  // console.log("the count " + result.response.beers);
                    for (var i = 0; i < result.response.beers.count; i++) {
                      // console.log("the name" + result.response.beers.items[i].beer.beer_name)
                      var beerDiv = $("<div class ='productHolder thumbnail beerDiv'>");
                      var beerCaption = $("<div class='caption'>");
                      var beerImage = $("<img>");
                      var btnImgDiv = $("<div class='btnImgDiv'>");
                      var beerBtn = $("<img role='button' id='beerButton' class='starButton'>");
                      beerBtn.attr("src", "/images/pint.png");
                      beerBtn.attr("onclick", "this.src = './images/colored.png'; saveBeer()");
                      beerBtn.attr("value", result.response.beers.items[i].beer.beer_name);
                      beerBtn.attr("data-button",result.response.beers.items[i].beer.beer_name);
                      beerImage.attr("alt", result.response.beers.items[i].beer.beer_name);
                      beerImage.attr("src", result.response.beers.items[i].beer.beer_label);
                      beerImage.addClass('beerImage');
                      var name = result.response.beers.items[i].beer.beer_name;
                      var brewery = result.response.beers.items[1].brewery.brewery_name;
                      var desc = result.response.beers.items[i].beer.beer_description;
                      var abv = result.response.beers.items[i].beer.beer_abv;
                      var beerStyle = result.response.beers.items[i].beer.beer_style;
                      // // display to DOM
                      btnImgDiv.append(beerBtn);
                      btnImgDiv.append("<p class='smallText'>favorite it?</p>");
                      beerCaption.append("<h3 id='beer' class='bname'>" + name + "</h3>");
                      beerCaption.append("<div class ='descDiv'>" + "<p class='productDescription'>" + desc + "</p>" + "</div");
                      beerCaption.append("<div class ='abvDiv'>" + "<p class='abv'>" + "ABV: " + abv + "</p>" + "</div");
                      beerCaption.append("<div class ='beerStyleDiv'>" + "<p class='beerStyle'>" + "Beer Style: " + beerStyle + "</p>" + "</div");
                      beerCaption.append("<div class ='BreweryDiv'>" + "<p class='Brewery'>" + "Brewery: " +brewery+ "</p>" + "</div")
                      beerCaption.append(btnImgDiv);


                      // // building thumbnail
                      beerDiv.append(beerImage);
                      beerDiv.append(beerCaption);
                      // beerDiv.append(beerBtn);
                      $('#display').append(beerDiv);
                    }

                }
                displayBeers();
          }});
    });
});
