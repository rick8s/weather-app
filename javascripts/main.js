requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'lodash': '../bower_components/lodash/lodash.min',
    'jquery-ui': '../bower_components/jquery-ui/jquery-ui.min',
    'q': '../bower_components/q/q'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
        exports: 'Firebase'
    }
  }
});

requirejs(
["core-dependencies", "auth"], 
function (coreDependencies, auth) {

    var ref = new Firebase("https://nss-weather-app.firebaseio.com");
    var authData = ref.getAuth();
    console.log("authentication data", authData);

    if (authData === null) {
      ref.authWithOAuthPopup("github", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          auth.setuid(authData.uid);
          require(
            ["core-logic"], 
            function (mainjs) {
              mainjs.mainjs()  //MAKE SURE YOU CHANGE THIS CALL TO CALL CORE-DEPENDENCIES AND TOM'S KEY THAT CONTAINS THE CODE
              console.log("successfull");
            });
        }
      })
    } else {
      auth.setuid(authData.uid);
      require(
        ["core-logic"],
        function (mainjs) {
          mainjs.mainjs(); //MAKE SURE YOU CHANGE THIS CALL TO CALL CORE-DEPENDENCIES AND TOM'S KEY THAT CONTAINS THE CODE
          console.log("else is logging correctly")
        })
    };


});