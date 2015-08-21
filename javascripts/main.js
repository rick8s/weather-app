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
["core-dependcies", "jquery"], 
function(coreDependencies, $) {




});