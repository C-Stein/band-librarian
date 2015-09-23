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

  // $scope.edit = function(piece) {
  //   //open edit modal
  //   var editHash = piece.$id;
  //   console.log(piece.$id);

  //   //populate fields with current information

  //   //user updates information and clicks a button when finished

  //   //updated object saved in firebase
  // };

}]);





