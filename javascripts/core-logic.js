define(function (require) {
	
	var $ = require('jquery');
	var getData = require('get-data');
	var templates = require("templates");
	

	return function () {

		$("#zipSearch").click(function() {
		//Calling getData module passing anonymous function
			var wxzip = $('#zipInput').val();
			// console.log(wxzip);
			var dayCount = 01;

			getData(wxzip, dayCount)
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
			.then(function (weatherObj) {

				// console.log(weatherObj);
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
			.then(function (weatherObj) {

				console.log(weatherObj);
				var populateAdditionalDays = templates.additionalDaysTemplate(weatherObj.additionalDays);
				$('#forecastSeven').html(populateAdditionalDays);
			})
			.fail(function (error) {
				console.log("Error:",  error);
			})
			.done();

		}); 

	}; // End of return function
});
