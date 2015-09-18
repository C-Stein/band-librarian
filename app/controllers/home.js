app.controller("HomeCtrl", ["$scope", "$firebaseArray", "$firebaseAuth", "uid", "currentAuth",
  function($scope, $firebaseArray, $firebaseAuth, uid, currentAuth) {
  var ref = new Firebase("https://band-library.firebaseio.com/");
     
$scope.pieces = new $firebaseArray(ref.child('pieces')); 


  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  function routeTo(route) {
    window.location.href = '#/' + route;
  }

  $scope.logout = function () {
    console.log("logged out");
    ref.unauth();
    routeTo('/login');
  };

  $scope.edit = function(piece) {
    //open edit modal

    //populate fields with current information

    //user updates information and clicks a button when finished

    //updated object saved in firebase
  };

}]);





