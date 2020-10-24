let city
const apiKey = "&appid=94dc837cac6009ee9dec8622a9fe75ff";




$("#citySubmit").on("click", function() {

    $('#forecastTitle').addClass('show');

    city = $("#cityInput").val();
    console.log(city);

    $("#cityInput").val("");  

const firstqueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
$.ajax({
    url: firstqueryUrl,
    method: "GET"
  })
  .then(function (response){

    console.log(response);

    console.log(response.name);

    console.log(response.coord)

    lat = (response.coord["lon"])
    lon = (response.coord["lat"])


    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    console.log(Math.floor(tempF));

    console.log(response.main.humidity);

    console.log(response.wind.speed);

    var uviQueryURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + apiKey;
    $.ajax({
        url: uviQueryURL,
        method: "GET"
      })
      .then(function (response){
          
        console.log(response);

//today's weather icon, highs, lows, wind speed, humidity, uv index with a color indicator
//we want the 5 day: weather icon, temperture, humidity


      })


    })
});