const apiKey = "&appid=94dc837cac6009ee9dec8622a9fe75ff";
let date = new Date();
let city
var pastSearch = localStorage.getItem("Past Cities");

makeHistory();
function makeHistory(){

pastSearch = JSON.parse(pastSearch) || [];

for (i = 0; i < pastSearch.length; i++) {
    var PC = document.createElement("ul")  
    PC.innerHTML = pastSearch[i];

    console.log(PC);
    document.getElementById("searchHistory").appendChild(PC); 
    
}
    $("ul").addClass("list-group list-group-flush list");

}

$("#citySubmit").on("click", function() {

    $('#forecastTitle').addClass('show');

    city = $("#cityInput").val();
    
    pastSearch.push(city);
    localStorage.setItem("Past Cities", JSON.stringify(pastSearch));

    $("#cityInput").val("");  

    if(!localStorage.getItem('scheduledEvents')) {
        updateCalendar(scheduledEvents);
      } else {
    updateCalendar(JSON.parse(localStorage.getItem('scheduledEvents')))
      }
      $("#searchHistory").empty();


      for (i = 0; i < pastSearch.length; i++) {
          var PC = document.createElement("ul")  
          PC.innerHTML = pastSearch[i];
      
          console.log(PC);
          document.getElementById("searchHistory").appendChild(PC); 
          
      }
          $("ul").addClass("list-group list-group-flush list");



      //and adds the text to the calender
    function updateCalendar(scheduledEvents){
        $(".calendar-row").each(function() {
            let theHour = $(this).children("div");
            $(this).children("textarea").text(scheduledEvents[theHour.text()]);
        })
    }


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
        console.log(city);

        const card = $("<div>").addClass("card");
        const cardBody = $("<div>").addClass("card-body");
        const cityname = $("<h4>").addClass("card-title").text(city);
        const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
        const highTemp = $("<p>").addClass("card-text").text("High: " + todayHigh + " °F");
        const lowTemp = $("<p>").addClass("card-text").text("Low: " + todayMin + " °F");
        const UVDanger = $("<p>").addClass("card-text").text("UV Index: " + todayUVI);    
        const humidity = $("<p>").addClass("card-text").text("Humidity: " + todayHumidity + "%");
        const wind = $("<p>").addClass("card-text").text("Wind Speed: " + todayWind + " MPH");
        const image = $("<img>").attr("src", todayIconLink)

        cityname.append(cityDate, image)
        cardBody.append(cityname, highTemp, lowTemp, UVDanger, humidity, wind);
        card.append(cardBody);
        $("#currentCity").append(card)





        

        for (let i = 1; i <= 5; i++) {

            var futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + i);


            var futurehightemp = response.daily[i].temp.max;
            console.log(futurehightemp);
            var futurelowtemp = response.daily[i].temp.min;
            console.log(futurelowtemp);
            var futureIcon = response.daily[i].weather[0].icon;
            console.log(futureIcon);
            var futureHumidity = response.daily[i].humidity;
            console.log(futureHumidity);
            futureIconLink = "http://openweathermap.org/img/wn/" + futureIcon + "@2x.png";

            const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
            const cardBody = $("<div>").addClass("card-body p-3")
            const cityDate = $("<h4>").addClass("card-title").text(futureDate.toLocaleDateString('en-US'));
            const highTemp = $("<p>").addClass("card-text").text("High: " + futurehightemp + " °F");
            const lowTemp = $("<p>").addClass("card-text").text("Low: " + futurelowtemp + " °F");
            const humidity = $("<p>").addClass("card-text").text("Humidity: " + futureHumidity + "%");
    
            const image = $("<img>").attr("src", futureIconLink);
    
            cardBody.append(cityDate, image, highTemp, lowTemp, humidity);
            card.append(cardBody);
            $("#5dayForecast").append(card);


            
        }



// add local storage and click as a search
//clearing on search
// uv i color codes
//rounding numbers
//comment up code


      })


    })
});