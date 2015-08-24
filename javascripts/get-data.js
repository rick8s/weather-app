// http://api.openweathermap.org/data/2.5/forecast/daily?zip=37122,us&cnt=7&mode=json

define(function (require) {
     var $ = require("jquery");
     var q = require("q");
     var datejs = require("datejs"); // Library to format date for weather. Pretty sweet.
      
    return function (wxzip, dayCount) {
      
      var deferred = q.defer();     

      $.ajax({
        // Gets passed ZIP and # of days when called in core-logic module.
        url:"http://api.openweathermap.org/data/2.5/forecast/daily?zip=" + wxzip + ",us&cnt=" + dayCount + "&mode=json&units=imperial"
      })
      .done(function(data){
        // console.log(data);
          // Build custom weather object from data. These keys match HBS template current-weather
          var weatherObj = {
            city: data.city.name,
            currentTemp: data.list[0].temp.day,
            wind: data.list[0].speed,
            conditions: data.list[0].weather[0].description,
            pressure: data.list[0].pressure,
            // This is the jam right here: set up array to store additional days of weather if necessary
            additionalDays: []
          };

        // Add to additional days array with object for days 2-3. Keys match HBS template additional-days
        if (dayCount >= "3") {

          for (var i = 1; i <= 2; i++) {
            
            weatherObj.additionalDays.push({
            
              high: data.list[i].temp.max,
              low: data.list[i].temp.min,
              wind: data.list[i].speed,
              description: data.list[i].weather[0].description,
              pressure: data.list[i].pressure,
              date: Date.today().add(i).days().toString("MMM d")


            });
          }

        } 

        // Using == here because === was getting funky with strings vs. numbers. Can't see any issues that would arise...
        if (dayCount == "7") {
          
          // Grunt throwing error here, i is already defined. ?? Not hindering code from running.
          for (var i = 3; i <= 6; i++) {
            
            weatherObj.additionalDays.push({
            
              high: data.list[i].temp.max,
              low: data.list[i].temp.min,
              wind: data.list[i].speed,
              description: data.list[i].weather[0].description,
              pressure: data.list[i].pressure,
              date: Date.today().add(i).days().toString("MMM d")

            });
          }
        }

        // console.log(weatherObj);
        //
        deferred.resolve(weatherObj);
      })
      .fail(function(xhr, status, error) {
        deferred.reject(error);
      });

      return deferred.promise;

    };

});


