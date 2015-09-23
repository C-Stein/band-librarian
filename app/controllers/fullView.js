app.controller("FullViewCtrl", ["$scope", "$routeParams", "$firebaseArray", "$firebaseObject", "$firebase", "$location", "uid",
  function($scope, $routeParams, $firebaseArray, $firebaseObject, $firebase, $location, uid) {
    $scope.selectedPiece = {};
    $scope.pieceId = $routeParams.pieceId;
    $scope._ = _;
    $scope.advice = "";

    var ref = new Firebase("https://band-library.firebaseio.com/pieces/" + $scope.pieceId );
    $scope.selectedPiece = $firebaseObject(ref);


    var fullRef = new Firebase ("https://band-library.firebaseio.com");

    $scope.adviceList = $firebaseArray(fullRef.child('comments').orderByChild('piece').equalTo($scope.pieceId));



    console.log("$scope.selectedPiece", $scope.selectedPiece);



   
  }
]);

