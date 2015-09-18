var app = angular.module("BandLib", ['firebase', 'angular.filter', 'ngRoute', 'ui.bootstrap']);





app.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
}]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl',
        resolve: {
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }
      }).when ('/addPiece', {
        templateUrl: 'partials/addPiece.html',
        controller: 'addPieceCtrl',
        resolve: {
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }
      }).when ('/searchPiece', {
        templateUrl: 'partials/searchPiece.html',
        controller: 'SearchCtrl',
        resolve: {
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }
      }).when ('/about', {
        templateUrl: 'partials/about.html',
        controller: 'AboutCtrl',
        resolve: {
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }
      }).when ('/login', {
        templateUrl: 'partials/auth.html',
        controller: 'AuthCtrl'
      }).otherwise ({
        redirectTo: '/login'
      });
}]);