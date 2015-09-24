app.controller("HomeCtrl", ["$scope", "$firebaseArray", "$firebaseAuth", "uid", "currentAuth",
  function($scope, $firebaseArray, $firebaseAuth, uid, currentAuth) {
  var ref = new Firebase("https://band-library.firebaseio.com/");
     
$scope.pieces = new $firebaseArray(ref.child('pieces')); 

$scope.notLoaded = false;


  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  $scope.pieces.$loaded().then(function() {
    $scope.notLoaded = true;
    console.log("$loaded thing");
  });

  function routeTo(route) {
    window.location.href = '#/' + route;
  }

  $scope.logout = function () {
    console.log("logged out");
    ref.unauth();
    routeTo('/login');
  };

}]);





