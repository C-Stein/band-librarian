app.controller("DetailCtrl", ["$scope", "$routeParams", "$firebaseArray",
  function($scope, $routeParams, $firebaseArray) {
    $scope.selectedPiece = {};
    $scope.pieceId = $routeParams.pieceId;
    $scope._ = _;

    var ref = new Firebase("https://band-library.firebaseio.com/");
    $scope.pieces = new $firebaseArray(ref.child('pieces'));

    console.log("$scope.pieceId", $scope.pieceId);

      
      

  }
]);
