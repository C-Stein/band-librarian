app.controller("EditCtrl", ["$scope", "$routeParams", "$firebaseArray", "$firebaseObject", "$firebase", "$location", "uid", 
  function($scope, $routeParams, $firebaseArray, $firebaseObject, $firebase, $location, uid) {
    $scope.selectedPiece = {};
    $scope.pieceId = $routeParams.pieceId;
    $scope._ = _;
    $scope.advice = "";
    var ref = new Firebase("https://band-library.firebaseio.com/pieces/" + $scope.pieceId );
    $scope.selectedPiece = $firebaseObject(ref);

    var fullRef = new Firebase ("https://band-library.firebaseio.com");

    $scope.adviceList = $firebaseArray(fullRef.child('comments').orderByChild('piece').equalTo($scope.pieceId));

    console.log("$scope.pieceId", $scope.pieceId);
    console.log("$scope.selectedPiece", $scope.selectedPiece);

    $scope.submit = function(obj) {
       obj.$save().then(function(ref) {
        console.log("Saved!");
        }, function(error) {
          alert("Please log in using Facebook, Twitter, or Github to edit pieces");
          $location.url("/login");
       });
    };

    //why is the factory not working?!?!?!
    $scope.uid =  ref.getAuth().uid;
    console.log("$scope.uid", $scope.uid);

    $scope.adviceObj = {
      contents: "",
      piece: $scope.selectedPiece.$id,
      author: $scope.uid,
      rating: 0
    };

    $scope.addAdvice = function(comment) {
      console.log("comment", comment);
      var root = new Firebase ("https://band-library.firebaseio.com");
      var id = root.child("/comments").push();
      id.set(comment, function(err) {
        if (err) {
          console.log(err);
        } else {
          var name = id.key();
          console.log("name", name);
          root.child("/pieces/" + comment.piece + "/comments/" + name).set(true);
          root.child("/users/" + comment.author + "/comments/" + name).set(true);
        }
      });
     $scope.adviceObj.contents = "";
    };

   
  }
]);

