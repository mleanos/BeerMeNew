// setup profile image upload form submit handler
$('#profileImageForm').submit(function () {

  // add validation here to make sure have a file selected
  if($('#profileImage').value != "") {
   // you have a file

  }
  else {
    alert("Please attach a file");
  }

  $(this).ajaxSubmit({
    error: function (errorResponse) {
      console.log('error response: ', errorResponse);
    },
    success: function (response) {
      console.log('success response: ', response);
      // add response handling here to show image on page
        console.log("");
      //  $(".displayDiv").
    }
  });

  return false;
});

$.get("/api/userdata", function (response) {
  console.log('response: ', response);
  var profileImage = $("<img  width='200' height='200' class='img-responsive img-circle'>");
  var blurbCaption = $("<div>")
  var profileDiv = $("<div class='col-lg-3 col-lg-3 productHolder thumbnail hero-feature'>")
  profileImage.attr("src", './' + response.profileImageUrl);
  profileImage.attr("alt", response.username);
  var name = response.username;
  blurbCaption.append("<span class='personName'>" + name + "</span>");
  blurbCaption.append(profileImage);
  profileDiv.append(blurbCaption);
  $('.displayDiv').append(profileDiv);

});
/*
$.get("/api/beers", function(response) {
  // console.log("The res: "+ response);
  var tableRow = $("<tr>");
  var tableDiv = $("<td>");
  var tableDiv2 = $("<td>");
  var tableDiv3 = $("<td>");
  for (var i = 0; i < response.length; i++) {
    var clientId = "&client_id=43D9E7E6E3B9C50C285014E7BE74DDCBE021FA00";
    var clientSecret = "&client_secret=E2DFC619E166E32349A9C8E784395C5702BEDCBB";
    var query = "q="
    var url = "https://api.untappd.com/v4/";
    var searchBeer = "search/beer?";
    var baseUrl = "https://api.untappd.com/v4/";
    var thebeer = response[i].beername;
    var howManybeer = "<span class='amount'>" + response.length + " Beers</span>";
    tableDiv.append("<p>" + thebeer + "</p>");
      $.ajax({url: baseUrl + searchBeer + query + thebeer + clientId + clientSecret, success: function(result){
          var beerStyle = result.response.beers.items[0].beer.beer_style;
          var brewery = result.response.beers.items[0].brewery.brewery_name;
          // console.log("result "+JSON.stringify(result));
          tableDiv2.append("<p>" + beerStyle + "</p>");
          tableDiv3.append("<p>" + brewery + "</p>");
      }});
    $(tableRow).append(tableDiv);
    $(tableRow).append(tableDiv2);
    $(tableRow).append(tableDiv3);
    $("tbody.topt").append(tableRow);
  }
    $("#howMany1").append(howManybeer);
});
$.get("/api/favorites", function(response) {
    var tableR = $("<tr>");
    var tableD = $("<td>");
    var tableD2 = $("<td>");
    var tableD3 = $("<td>");
    for (var i = 0; i < response.length; i++) {
      clientId = "&client_id=43D9E7E6E3B9C50C285014E7BE74DDCBE021FA00";
      clientSecret = "&client_secret=E2DFC619E166E32349A9C8E784395C5702BEDCBB";
      query = "q="
      url = "https://api.untappd.com/v4/";
      searchBeer = "search/beer?";
      baseUrl = "https://api.untappd.com/v4/";
      var favbeer = response[i].beername;
      var howMany = "<span class='amount'>" + response.length + " Beers</span>";
      tableD.append("<p>" + favbeer + "</p>");
        $.ajax({url: baseUrl + searchBeer + query + favbeer + clientId + clientSecret, success: function(result){
            var favStyle = result.response.beers.items[0].beer.beer_style;
            var favbrewery = result.response.beers.items[0].brewery.brewery_name;
            // console.log("result "+JSON.stringify(result));
            tableD2.append("<p>" + favStyle + "</p>");
            tableD3.append("<p>" + favbrewery + "</p>");
        }});
      $(tableR).append(tableD);
      $(tableR).append(tableD2);
      $(tableR).append(tableD3);
      $("tbody.bottomt").append(tableR);
    }
      $("#howMany").append(howMany);
  });
  $.get("/api/breweries", function(response) {
      var tableRB = $("<tr>");
      var tableDB = $("<td>");
      var tableD2B = $("<td>");
      var tableD3B = $("<td>");
      for (var i = 0; i < response.length; i++) {
        clientId = "&client_id=43D9E7E6E3B9C50C285014E7BE74DDCBE021FA00";
        clientSecret = "&client_secret=E2DFC619E166E32349A9C8E784395C5702BEDCBB";
        query = "q="
        url = "https://api.untappd.com/v4/";
        searchBeer = "search/beer?";
        baseUrl = "https://api.untappd.com/v4/";
        var favbrew = response[i].brewery;
        var howManybrew = "<span class='amount'>" + response.length + " Breweries</span>";
          $.ajax({url: baseUrl + searchBeer + query + favbrew + clientId + clientSecret, success: function(result){
              var location = result.response.beers.items[0].brewery.location.brewery_city + ", " + result.response.beers.items[0].brewery.location.brewery_state;
              var favbrewery = result.response.beers.items[0].brewery.brewery_name;
              var active = result.response.beers.items[0].brewery.brewery_active;
              if (active===1) {
                  active = "Yes"
              }
              else {
                active = "No"
              }
              tableD3B.append("<p>" + active + "</p>");
              tableD2B.append("<p>" + location + "</p>");
              tableDB.append("<p>" + favbrewery + "</p>");
          }});
        $(tableRB).append(tableDB);
        $(tableRB).append(tableD2B);
        $(tableRB).append(tableD3B);
        $("tbody.brewt").append(tableRB);
      }
        $("#brewMany").append(howManybrew);
    });
*/
