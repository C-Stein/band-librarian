app.controller("SearchCtrl", ["$scope", "$firebaseArray", 
  function($scope, $firebaseArray) {

  
    var ref = new Firebase("https://band-library.firebaseio.com/");
     
    $scope.pieces = new $firebaseArray(ref.child('pieces')); 
    $scope.filteredPieces = [];

  }
]);
