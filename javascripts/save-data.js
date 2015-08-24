define(function (require) {

    var $ = require("jquery");

    // Data for POST call:
    //Pass this function the weatherObj



    $.ajax({
            url: "https://nss-weather-app.firebaseio.com/"
            method: "POST",
            data: JSON.stringify(saveWeatherObj),  
        })
        .done(function (data) {
            deferred.resolve(data);
        })
        .fail(function(xhr, status, error) {
            deferred.reject(error);
        });

    return deferred.promise;



});

