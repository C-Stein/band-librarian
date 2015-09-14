app.controller("addPieceCtrl", ["$scope", "$firebaseArray", 
  function($scope, $firebaseArray) {
    var ref = new Firebase("https://band-library.firebaseio.com/pieces");

    $scope.pieces = $firebaseArray(ref);
    $scope.uid = ref.getAuth().uid;
    $scope.newPiece = {};

$scope.attribute = {
       technical : false,
       lyrical : false,
       hasSolos: false,
       largePercussion: false,
       smallPercussion: false
     };

    $scope.addPiece = function() {
      if ($scope.newPiece.title === undefined || $scope.newPiece.composer === undefined) {
        alert("You must enter a Title and Composer");
      }
      console.log("adding piece");
      $scope.pieces.$add({
        "title": $scope.newPiece.title,
        "composer": $scope.newPiece.composer, 
        "arranger": $scope.newPiece.arranger || null,
        "year": $scope.newPiece.year || null,
        "publisher": $scope.newPiece.publisher || null,
        "grade": $scope.newPiece.grade || null,
        "attributes": {
          "technical": $scope.attribute.technical,
          "lyrical": $scope.attribute.lyrical,
          "hasSolos": $scope.attribute.hasSolos,
          "largePercussion": $scope.attribute.largePercussion,
          "smallPercussion": $scope.attribute.smallPercussion
        },
        "uid": $scope.uid
    });
    console.log($scope.newPiece);
    $scope.newPiece = {"":""};
   };
    

   }
]);