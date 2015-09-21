app.controller("DetailCtrl", ["$scope", "$routeParams", "$firebaseObject",
  function($scope, $routeParams, $firebaseObject) {
    $scope.selectedPiece = {};
    $scope.pieceId = $routeParams.pieceId;
    $scope._ = _;

    console.log("Did we even get here?");
    var ref = new Firebase("https://band-library.firebaseio.com/");
    $scope.piece = new $firebaseObject(ref.child('pieces/' + $scope.pieceId));


    // $scope.selectedPiece = _.findKey($scope.pieces, {'$id': $scope.pieceID});

    // $scope.selectedPiece = pieces.filter(function(piece) {
    //   return piece.$id === parseInt($scope.songId);
    // })[0];
  
  $scope.selectedPiece = $scope.pieces[$scope.pieceId];



    console.log("$scope.pieceId", $scope.pieceId);
    console.log("$scope.pieces", $scope.pieces);
    console.log("$scope.selectedPiece", $scope.selectedPiece);

      
      

  }
]);
