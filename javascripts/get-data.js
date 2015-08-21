// http://api.openweathermap.org/data/2.5/forecast/daily?zip=37122,us&cnt=7&mode=json

define(function(require)
 
  
        {
     var $ = require("jquery");

            return function(wxZip){
    
    //Test Variables that will be populated with userInput data
    var wxzip = "37122";
    var count = "1";      

      $.ajax({
        url:"http://api.openweathermap.org/data/2.5/forecast/daily?zip=" + wxzip + ",us&cnt=" + count + "&mode=json",
        method: "GET"
      }).done(function(data){
        data.saved = false;
        console.log("done");
       /* $.ajax({
         
           url: "FIREBASE URL FOR SAVING WEATHER",
          method: "POST",
          data: JSON.stringify(data)
        }).done(function(){
          console.log("loaded to firebase");
        });*/
    console.log(data);

      });
  };
});
