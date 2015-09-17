var app = angular.module("BandLib", ['firebase', 'angular.filter', 'ngRoute']);


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).when ('/addPiece', {
        templateUrl: 'partials/addPiece.html',
        controller: 'addPieceCtrl'
      }).when ('/searchPiece', {
        templateUrl: 'partials/searchPiece.html',
        controller: 'SearchCtrl'
      }).when ('/about', {
        templateUrl: 'partials/about.html',
        controller: 'AboutCtrl'
      }).when ('/:pieceId', {
        templateUrl: 'partials/detail.html',
        controller: 'DetailCtrl'
      }).otherwise ({
        redirectTo: '/'
      });
}]);