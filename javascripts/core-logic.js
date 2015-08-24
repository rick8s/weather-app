define(function (require) {
	
	var $ = require('jquery');
	var getData = require('get-data');
	var templates = require("templates");
	

	return function () {
		// Displays current weather
		$("#zipSearch").click(function() {
			var dayCount = 01;
			var wxzip = $('#zipInput').val();

			// Pass ZIP and number of days to getData module, which contains Ajax call and promise
			getData(wxzip, dayCount)
			// Promise returns our custom weather object to pass to HBS template.
			.then(function (weatherObj) {
				// console.log(weatherObj);
				var populateCurrentWeather = templates.currentWeatherTemplate(weatherObj);
				$('#currentWeather').html(populateCurrentWeather);
			})
			.fail(function (error) {
				console.log("Error:",  error);
			})
			.done();
			
		});

		$(document).on('click', '#selectThree', function () {
			var dayCount = 03;
			var wxzip = $('#zipInput').val();

			getData(wxzip, dayCount)
			// Promise returns our custom weather object with an added additionalDays array for days 2 and 3
			.then(function (weatherObj) {

				// console.log(weatherObj);
				//Pass each of the objects in additionalDays array to additionalDays HBS template
				var populateAdditionalDays = templates.additionalDaysTemplate(weatherObj.additionalDays);
				$('#forecastThree').html(populateAdditionalDays);
			})
			.fail(function (error) {
				console.log("Error:",  error);
			})
			.done();

		});

		$(document).on('click', '#selectSeven', function () {
			var dayCount = 07;
			var wxzip = $('#zipInput').val();

			getData(wxzip, dayCount)
			// Promise returns our custom weather object with an added additionalDays array for days 2-7
			.then(function (weatherObj) {

				// console.log(weatherObj);
				//Pass each of the objects in additionalDays array to additionalDays HBS template
				var populateAdditionalDays = templates.additionalDaysTemplate(weatherObj.additionalDays);
				// Hide div that is populated with Three-Day forecast and populate DOM with seven days
				$('#forecastThree').hide();
				$('#forecastSeven').html(populateAdditionalDays);
			})
			.fail(function (error) {
				console.log("Error:",  error);
			})
			.done();

		}); 

	}; // End of return function
});
