// http://api.openweathermap.org/data/2.5/forecast/daily?zip=37122,us&cnt=7&mode=json

define(function (require) {
     var $ = require("jquery");
     var q = require("q");
      
    return function (wxzip, dayCount) {
    
      //Test Variables that will be populated with userInput data
      
      var deferred = q.defer();     

      $.ajax({
        url:"http://api.openweathermap.org/data/2.5/forecast/daily?zip=" + wxzip + ",us&cnt=" + dayCount + "&mode=json&units=imperial"
      })
      .done(function(data){
        console.log(data);
          var weatherObj = {
            city: data.city.name,
            currentTemp: data.list[0].temp.day,
            wind: data.list[0].speed,
            conditions: data.list[0].weather[0].description,
            pressure: data.list[0].pressure,
            additionalDays: []
          };

        if (dayCount >= "3") {

          // Add day 2 and 3 to weather obj

          for (var i = 1; i <= 2; i++) {
            weatherObj.additionalDays.push({
            
              high: data.list[i].temp.max,
              low: data.list[i].temp.min,
              wind: data.list[i].speed,
              description: data.list[i].weather[0].description,
              pressure: data.list[i].pressure,
              date: data.list[i].dt

            });
          }

        } 

        if (dayCount == "7") {
          // add day 4-7 to weather obj

          for (var i = 3; i <= 6; i++) {
            weatherObj.additionalDays.push({
            
              high: data.list[i].temp.max,
              low: data.list[i].temp.min,
              wind: data.list[i].speed,
              description: data.list[i].weather[0].description,
              pressure: data.list[i].pressure,
              date: data.list[i].dt

            });
          }
        }

        // console.log(weatherObj);
        deferred.resolve(weatherObj);
      })
      .fail(function(xhr, status, error) {
        deferred.reject(error);
      });

      return deferred.promise;

    };

});


