app.controller("DetailCtrl", ["$scope", "$routeParams", "$firebaseObject", "$firebase",
  function($scope, $routeParams, $firebaseObject, $firebase) {
    $scope.selectedPiece = {};
    $scope.pieceId = $routeParams.pieceId;
    $scope._ = _;


    var ref = new Firebase("https://band-library.firebaseio.com/pieces/" + $scope.pieceId );
    $scope.selectedPiece = $firebaseObject(ref);



    console.log("$scope.pieceId", $scope.pieceId);
    console.log("$scope.selectedPiece", $scope.selectedPiece);

     $scope.submit = function(obj) {
       obj.$save().then(function(ref) {
        console.log("Saved??");
    //     ref.key() === obj.$id;
    //     }
    //     }
       });
     };

      
      

  }
]);

// var obj = $firebaseObject(ref); (selected piece)
// obj.foo = "bar";
// obj.$save().then(function(ref) {
//   ref.key() === obj.$id; // true
// }, function(error) {
//   console.log("Error:", error);
// });
