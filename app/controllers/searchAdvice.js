app.controller("AdviceCtrl", ["$scope", "$firebaseArray", "$firebaseObject", "$firebase", "$location", "uid",
  function($scope, $firebaseArray, $firebaseObject, $firebase, $location, uid) {
    


    var fullRef = new Firebase ("https://band-library.firebaseio.com");

    var comments = $firebaseObject(fullRef.child('comments'));

    $scope.adviceList = $firebaseArray(fullRef.child('comments'));




  


   
  }
]);

