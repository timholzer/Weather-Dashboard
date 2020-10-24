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

    lat = (response.coord["lat"])
    lon = (response.coord["lon"])


    var uviQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + apiKey;
    $.ajax({
        url: uviQueryURL,
        method: "GET"
      })
      .then(function (response){
          
        console.log(response);
        var todayHumidity = response.daily[0].humidity;
        console.log(todayHumidity);
        var todayUVI = response.daily[0].uvi;
        console.log(todayUVI);
        var todayWind = response.daily[0].wind_speed;
        console.log(todayWind);
        var todayIcon = response.daily[0].weather[0].icon;
        console.log(todayIcon);
        var todayHigh = response.daily[0].temp.max;
        console.log(todayHigh);
        var todayMin = response.daily[0].temp.min;
        console.log(todayMin);


        todayIconLink = "http://openweathermap.org/img/wn/" + todayIcon + "@2x.png";
        console.log(todayIconLink);

        

        for (let i = 1; i <= 5; i++) {
            var futurehightemp = response.daily[i].temp.max;
            console.log(futurehightemp);
            var futurelowtemp = response.daily[i].temp.min;
            console.log(futurelowtemp);
            var futureIcon = response.daily[i].weather[0].icon;
            console.log(futureIcon);
            var futureHumidity = response.daily[i].humidity;
            console.log(futureHumidity);
            futureIconLink = "http://openweathermap.org/img/wn/" + futureIcon + "@2x.png";

            
        }



//today's weather icon, highs, lows, wind speed, humidity, uv index with a color indicator
//we want the 5 day: weather icon, temperture, humidity


      })


    })
});