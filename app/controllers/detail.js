app.controller("DetailCtrl", ["$scope", "$routeParams", "$firebaseObject",
  function($scope, $routeParams, $firebaseObject) {
    $scope.selectedPiece = {};
    $scope.pieceId = $routeParams.pieceId;
    $scope._ = _;


    var ref = new Firebase("https://band-library.firebaseio.com/pieces/" + $scope.pieceId );
    $scope.selectedPiece = $firebaseObject(ref);



    console.log("$scope.pieceId", $scope.pieceId);
    console.log("$scope.selectedPiece", $scope.selectedPiece);

      
      

  }
]);
