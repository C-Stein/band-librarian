app.controller("SearchCtrl", ["$scope", "$firebaseArray", 
  function($scope, $firebaseArray) {

  
    var ref = new Firebase("https://band-library.firebaseio.com/");
    $scope.searchCategories = "";      
    $scope.pieces = new $firebaseArray(ref.child('pieces')); 
    $scope.filteredPieces = [];




    $scope.searchPieces = function() {
      $scope.filteredPieces = [];
      for (var i = 0; i < $scope.pieces.length; i++) {
        if ($scope.attributes.lyrical === $scope.pieces[i].attributes.lyrical && $scope.attributes.hasSolos === $scope.pieces[i].attributes.hasSolos && $scope.attributes.technical === $scope.pieces[i].attributes.technical && $scope.attributes.largePercussion === $scope.pieces[i].attributes.largePercussion && $scope.attributes.smallPercussion === $scope.pieces[i].attributes.smallPercussion) {
          $scope.filteredPieces.push($scope.pieces[i]);
        } 
      }
      if ($scope.filteredPieces.length === 0) {
        alert("sorry, no pieces matched your search");
      }
      console.log("filteredPieces", $scope.filteredPieces);
      return $scope.filteredPieces;
    };


    

  }
]);
