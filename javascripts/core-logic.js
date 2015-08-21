define(function (require) {
	
	return function () {

	var $ = require('jquery');
	var getData = require('get-data');
	var weatherObj;

	
		
	$("#zipSearch").click(function() {
	//Calling getData module passing anonymous function
	console.log("clicked");
		getData(function (data) {
			weatherObj = {
				city: data.city.name,
			    currentTemp: data.list[0].temp.day,
			    wind: data.list[0].speed,
			    conditions: data.list[0].weather[0].description,
			    pressure: data.list[0].pressure
			};
			// console.log(weatherObj);
		});
	});

	$(document).on("click", "#selectThree", function() {
		console.log("clicked 3 day");
		getData(function (data) {
			weatherObj3 = {
				day2: {
					ForecastHigh: data.list[1].temp.max,
					ForecastLow: data.list[1].temp.min,
					ForecastWind: data.list[1].speed,
					ForecastDescription: data.list[1].weather[0].description,
					ForecastPressure: data.list[1].pressure
				},
				day3: {
					ForecastHigh: data.list[2].temp.max,
					ForecastLow: data.list[2].temp.min,
					ForecastWind: data.list[2].speed,
					ForecastDescription: data.list[2].weather[0].description,
					ForecastPressure: data.list[2].pressure
				}
			};
			console.log("weatherObj3", weatherObj3)
		});
	});
	


	}
});
