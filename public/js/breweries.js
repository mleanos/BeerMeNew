$(document).ready(function() {
    $('.brew_search').on('click', function() {
        event.preventDefault();
        var clientId = "&client_id=43D9E7E6E3B9C50C285014E7BE74DDCBE021FA00";
        var clientSecret = "&client_secret=E2DFC619E166E32349A9C8E784395C5702BEDCBB";
        var query = "q="
        var searchBrewery = "search/brewery?";
        var baseUrl = "https://api.untappd.com/v4/";
        var thebrew = $('.theBrew').val();
          $.ajax({url: baseUrl + searchBrewery + query + thebrew + clientId + clientSecret, success: function(result){
              function displayBrews(){
                $('#displayBrews').empty();
                  var items = result.response.brewery.items;
                    for (var i = 0; i < items.length; i++) {
                      var brewId = result.response.brewery.items[i].brewery.brewery_id;
                      var clientIdSecond = "?client_id=43D9E7E6E3B9C50C285014E7BE74DDCBE021FA00";
                      var clientSecretSecond = "&client_secret=E2DFC619E166E32349A9C8E784395C5702BEDCBB";
                      var brewInfo = "brewery/info/"
                        $.ajax({url: baseUrl + brewInfo + brewId + clientIdSecond + clientSecretSecond, success: function(res){
                          var brewDiv = $("<div class ='productHolder thumbnail brewDiv'>");
                          var brewCaption = $("<div class='caption'>");
                          var brewImage = $("<img>");
                          var brewDescription = res.response.brewery.brewery_description;
                          var beerCount = res.response.brewery.beer_count;
                          var name = res.response.brewery.brewery_name;
                          // beer button
                          var beerBtn = $("<img id='brewbeerButton' class='brewstarButton'>");
                          beerBtn.attr("src", "/images/pint.png");
                          beerBtn.attr("onClick", "this.src = './images/colored.png'");
                          beerBtn.attr("data-button",res.response.brewery.brewery_name);
                          //
                          var btnImgDiv = $("<div class='btnImgDiv'>");
                          btnImgDiv.append(beerBtn);
                          btnImgDiv.append("<p class='smallText'>favorite it?</p>");
                          brewImage.attr("alt", res.response.brewery.brewery_name);
                          brewImage.attr("src", res.response.brewery.brewery_label);
                          brewImage.addClass('brewImage');
                          brewCaption.append("<h3>" + name + "</h3>");
                          brewCaption.append("<div class ='brewDescrip'>" + "<p class='brewDescription'>" + brewDescription + "</p>" + "</div");
                          brewCaption.append("<div class ='beerCount'>" + "<p class='bc'>" + "Beer Count: " + beerCount + "</p>" + "</div");
                          // // // building thumbnail
                          brewDiv.append(brewImage);
                          brewDiv.append(brewCaption);
                          brewDiv.append(btnImgDiv);
                          $('#displayBrews').append(brewDiv);
                        }});
                    }
                }
                displayBrews();
          }});
    });
});
