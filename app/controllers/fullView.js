app.controller("FullViewCtrl", ["$scope", "$routeParams", "$firebaseArray", "$firebaseObject", "$firebase", "$location", "uid",
  function($scope, $routeParams, $firebaseArray, $firebaseObject, $firebase, $location, uid) {
    $scope.selectedPiece = {};
    $scope.pieceId = $routeParams.pieceId;
    $scope._ = _;
    $scope.advice = "";

    var ref = new Firebase("https://band-library.firebaseio.com/pieces/" + $scope.pieceId );
    $scope.selectedPiece = $firebaseObject(ref);


    var fullRef = new Firebase ("https://band-library.firebaseio.com");

    var comments = $firebaseObject(fullRef.child('comments'));

    $scope.adviceList = $firebaseArray(fullRef.child('comments').orderByChild('piece').equalTo($scope.pieceId));

    $scope.uid =  ref.getAuth().uid;
    console.log("$scope.uid", $scope.uid);


    console.log("$scope.selectedPiece", $scope.selectedPiece);

    $scope.vote = function(comment) {
      console.log(comment.$id);
      var upVoteUsers = $firebaseArray(fullRef.child('/comments/' + comment.$id + '/upVoteUsers'));
      console.log(upVoteUsers);
      upVoteUsers.$loaded().then(function(){
        if(_.find(upVoteUsers, '$value', $scope.uid)) {
          console.log("user has already voted up");
          console.log(comment.rating);
        } else {
          upVoteUsers.$add($scope.uid).then(function(ref) {
            comments[comment.$id].rating += 1;
            updateRating();
            console.log("$scope.uid", $scope.uid);
            console.log("added?", ref.key());
          });
        }
      });
      function updateRating(){
        console.log("updateRating()", comment);
        comments.$save().then(function(ref){
          console.log("saved");
          console.log("comment.rating", comment.rating);
        }, function(error) {
          console.log("error", error);
        });
      }

    };    





   
  }
]);

