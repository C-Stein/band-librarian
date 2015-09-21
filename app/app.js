var app = angular.module("BandLib", ['firebase', 'angular.filter', 'ngRoute', 'ui.bootstrap']);

app.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
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
      }).when ('/login', {
        templateUrl: 'partials/auth.html',
        controller: 'AuthCtrl'
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
      }).when ('/piece/:pieceId', {
        templateUrl: 'partials/detail.html',
        controller: 'DetailCtrl',
        resolve: {
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }
      }).otherwise ({
        redirectTo: '/'
      });
}]);