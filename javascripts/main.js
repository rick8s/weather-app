requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'firebase': '../lib/bower_components/firebase/firebase',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'jquery-ui': '../lib/bower_components/jquery-ui/jquery-ui.min',
    'q': '../lib/bower_components/q/q',
    'datejs': '../lib/bower_components/datejs/build/production/date.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
        exports: 'Firebase'
    }
  }
});

requirejs(
["core-dependencies", "core-logic", "auth"], 
function (coreDependencies, coreLogic, auth) {

    var ref = new Firebase("https://nss-weather-app.firebaseio.com");
    var authData = ref.getAuth();
    console.log("authentication data", authData);

    if (authData === null) {
      ref.authWithOAuthPopup("twitter", function(error, authData) {
        // remember: "sessionOnly";
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          auth.setuid(authData.uid);
          require(
            ["core-logic"], 
            function (coreLogic) {
              coreLogic();  //MAKE SURE YOU CHANGE THIS CALL TO CALL CORE-DEPENDENCIES AND TOM'S KEY THAT CONTAINS THE CODE
              console.log("successfull");
            });
        }
      });
    } else {
      auth.setuid(authData.uid);
      require(
        ["core-logic"],
        function (coreLogic) {
          coreLogic(); //MAKE SURE YOU CHANGE THIS CALL TO CALL CORE-DEPENDENCIES AND TOM'S KEY THAT CONTAINS THE CODE
          console.log("else is logging correctly");
        });
    }




});



