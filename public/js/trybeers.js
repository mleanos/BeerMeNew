
      var clientId = "client_id=43D9E7E6E3B9C50C285014E7BE74DDCBE021FA00";
      var clientSecret = "&client_secret=E2DFC619E166E32349A9C8E784395C5702BEDCBB";
      var query = "q="
      var url = "https://api.untappd.com/v4/";
      var searchBeer = "beer/trending?";
      var favorites = [];

      var baseUrl = "https://api.untappd.com/v4/";
        $.ajax({url: baseUrl + searchBeer + clientId + clientSecret, success: function(result){
              $('#displayArea').empty();
              var theCount = result.response.macro.count;
              var rando = Math.floor((Math.random() * theCount) + 1);
              var newCount = rando + 1;
              if (newCount > theCount) {
                newCount = rando;
                rando = rando - 1;
              }
                  for (var i = rando; i < newCount; i++) {
                    // console.log("the name" + JSON.stringify(result));
                    var test = $("<input type='text' name='name' id='name' class='form-control'>")
                    var beertopPart = $("<div class='btopart'>");
                    var beerDiv = $("<div id='beerTime'  class ='productHolder thumbnail hero-feature beerDiv'>");
                    var beerCaption = $("<div class='caption'>");
                    var beerImage = $("<img>");
                    var drinkBtn = $("<button type='text' name='name' class='btn-default colorbtn replace'>"+"Drink it"+"</button>");
                    drinkBtn.attr("data-button", result.response.macro.items[i].beer.beer_name);
                    drinkBtn.on('click', function(){
                    event.preventDefault();
                     var beername = $(this).attr("data-button").toString();
                    //  console.log("the value "+ $(this).attr("data-button"));
                     $(this).parents(".productHolder").hide();
                     replaceBeer();
                     var beerObject = {
                         beername: beername,
                     };
                     $.post("/api/beers", beerObject)
                         .done(function(data) {
                             console.log("beers",data);
                         })
                         .fail(function(error) {
                             console.log("THIS FAILED DUDE");
                            //  console.log("the error "+ JSON.stringify(error));
                         });
                    });
                    var passBtn = $("<button class='btn-default'>"+"Eww Gross"+"</button>");
                    passBtn.on('click', function(){
                     $(this).parents(".productHolder").hide();
                     replaceBeer();
                    });
                    beerImage.attr("alt", result.response.macro.items[i].beer.beer_name);
                    beerImage.attr("src", result.response.macro.items[i].beer.beer_label);
                    beerImage.addClass('beerImage');
                    // beer button
                    var beerBtn = $("<img id='beerButton' class='starButton'>");
                    beerBtn.attr("src", "/images/pint.png");
                    beerBtn.attr("onClick", "this.src = './images/colored.png'");
                    beerBtn.attr("data-button",result.response.macro.items[i].beer.beer_name);

                    beerBtn.on('click', function(){
                      var beername = $(this).attr("data-button").toString();
                        console.log(beername);
                        console.log("favorites: ", favorites);
                      if(favorites.indexOf(beername) !== -1){
                        // add remove functionality here
                        console.log("Beer already favorited");

                      }
                      else{
                        addFavorite(beername);
                      }
                    });

                    //
                    // var btnImgDiv = $("<div class='btnImgDiv'>");
                    beertopPart.append(beerBtn);
                    // btnImgDiv.append(beerBtn);
                    // btnImgDiv.append("<p class='smallText'>favorite it?</p>");
                    var name = result.response.macro.items[i].beer.beer_name;
                    var abv = result.response.macro.items[i].beer.beer_abv;
                    var beerStyle = result.response.macro.items[i].beer.beer_style;
                    var brewed = result.response.macro.items[i].brewery.brewery_name;
                  //   // // display to DOM
                    beerCaption.append("<h3>" + name + "</h3>");
                    // beerCaption.append("<div class ='descDiv'>" + "<p class='productDescription'>" + desc + "</p>" + "</div");
                    beerCaption.append("<div class ='abvDiv'>" + "<p class='abv'>" + "ABV: " + abv + "</p>" + "</div");
                    beerCaption.append("<div class ='beerStyleDiv'>" + "<p class='beerStyle'>" + "Beer Style: " + beerStyle + "</p>" + "</div");
                    beerCaption.append("<div class ='brewingDiv'>" + "<p class='brew'>" + "Brewery: " + brewed + "</p>" + "</div");
                    // building thumbnail
                    beerDiv.append(beertopPart);
                    beerDiv.append(beerImage);
                    beerDiv.append(beerCaption);
                    beerDiv.append(drinkBtn);
                    beerDiv.append(passBtn);
                    // beerDiv.append(btnImgDiv);
                    $('#displayArea').append(beerDiv);
                  }
        }});
        function addFavorite(favbeer){
          var favorite = {
              favorites: favbeer
          };
          $.post("/api/favorites", favorite)
              .done(function(data) {
                  favorites.push(favbeer);
              })
              .fail(function(error) {
                  console.log("THIS FAILED DUDE");
                  // console.log("the error "+ JSON.stringify(error));
              });
        }
        $('.btn-default').on('click', function(){
          $("#beerTime").html("");
        });
        // get a new beer
          function replaceBeer(){
            $.ajax({url: baseUrl + searchBeer + clientId + clientSecret, success: function(result){
                  var theCount = result.response.macro.count;
                  var rando = Math.floor((Math.random() * theCount) + 1);
                  if (rando === theCount) {
                    rando = rando - 1;
                  }
                      for (var i = rando; i < rando + 1; i++) {
                        var beerDiv = $("<div id='beerTime'  class ='productHolder thumbnail hero-feature beerDiv'>");
                        var beerCaption = $("<div class='caption'>");
                        var beerImage = $("<img>");
                        var drinkBtn = $("<button class='btn-default colorbtn replace'>"+"Drink it"+"</button>");
                        var beertopPart = $("<div class='btopart'>");

                        drinkBtn.attr("data-button", result.response.macro.items[i].beer.beer_name);
                        drinkBtn.on('click', function(){
                           var beername = $(this).attr("data-button");
                           $(this).parents(".productHolder").hide();
                           replaceBeer();
                           var beerObject = {
                               beername: beername,
                               user:1
                           };
                           $.post("/api/beers", beerObject)
                               .done(function(data) {
                                   console.log(data);
                               })
                               .fail(function(error) {
                                   console.log("THIS FAILED");
                               });
                        });
                        var passBtn = $("<button class='btn-default colorbtn'>"+"Eww Gross"+"</button>");
                        passBtn.on('click', function(){
                           $(this).parents(".productHolder").hide();
                           replaceBeer();
                        });
                        beerImage.attr("alt", result.response.macro.items[i].beer.beer_name);
                        beerImage.attr("src", result.response.macro.items[i].beer.beer_label);
                        beerImage.addClass('beerImage');
                        // beer button
                        var beerBtn = $("<img id='beerButton' class='starButton'>");
                        beerBtn.attr("src", "/images/pint.png");
                        beerBtn.attr("onClick", "this.src = './images/colored.png'");
                        beerBtn.attr("data-button",result.response.macro.items[i].beer.beer_name);
                        beerBtn.on('click', function(){
                          var beername = $(this).attr("data-button").toString();
                            console.log(beername);
                            console.log("favorites: ", favorites);
                          if(favorites.indexOf(beername) !== -1){
                            // add remove functionality here
                            console.log("Beer already favorited");

                          }
                          else{
                            addFavorite(beername);
                          }
                        });
                        //
                        beertopPart.append(beerBtn);
                        // var btnImgDiv = $("<div class='btnImgDiv'>");
                        // btnImgDiv.append(beerBtn);
                        // btnImgDiv.append("<p class='smallText'>favorite it?</p>");
                        var name = result.response.macro.items[i].beer.beer_name;
                        // var desc = result.response.macro.items[i].beer.beer_description;
                        var abv = result.response.macro.items[i].beer.beer_abv;
                        var beerStyle = result.response.macro.items[i].beer.beer_style;
                      //   // // display to DOM
                        beerCaption.append("<h3>" + name + "</h3>");
                        // beerCaption.append("<div class ='descDiv'>" + "<p class='productDescription'>" + desc + "</p>" + "</div");
                        beerCaption.append("<div class ='abvDiv'>" + "<p class='abv'>" + "ABV: " + abv + "</p>" + "</div");
                        beerCaption.append("<div class ='beerStyleDiv'>" + "<p class='beerStyle'>" + "Beer Style: " + beerStyle + "</p>" + "</div");
                      //   // // building thumbnail
                        beerDiv.append(beertopPart);
                        beerDiv.append(beerImage);
                        beerDiv.append(beerCaption);
                        beerDiv.append(drinkBtn);
                        beerDiv.append(passBtn);
                        // beerDiv.append(btnImgDiv);
                        $('#displayArea').append(beerDiv);
                      }
            }});
          }
