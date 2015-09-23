app.controller("DetailCtrl", ["$scope", "$routeParams", "$firebaseArray", "$firebaseObject", "$firebase", "$location", "uid",
  function($scope, $routeParams, $firebaseArray, $firebaseObject, $firebase, $location, uid) {
    $scope.selectedPiece = {};
    $scope.pieceId = $routeParams.pieceId;
    $scope._ = _;
    $scope.advice = "";
    // $scope.adviceList = {};
    var ref = new Firebase("https://band-library.firebaseio.com/pieces/" + $scope.pieceId );
    $scope.selectedPiece = $firebaseObject(ref);
    //$scope.voters = 0;

    var fullRef = new Firebase ("https://band-library.firebaseio.com");

    $scope.adviceList = $firebaseArray(fullRef.child('comments').orderByChild('piece').equalTo($scope.pieceId));

    var comments = $firebaseObject(fullRef.child('comments'));

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

    $scope.vote = function(comment) {
      console.log(comment.$id);
      var upVoteUsers = $firebaseArray(fullRef.child('/comments/' + comment.$id + '/upVoteUsers'));
      console.log(upVoteUsers);
      upVoteUsers.$loaded().then(function(){
        if(_.find(upVoteUsers, '$value', $scope.uid)) {
          console.log("user has already voted up");
          console.log(comment.rating);
          // updateRating();
        } else {
          upVoteUsers.$add({uid: $scope.uid}).then(function(ref) {
            updateRating();
            console.log("$scope.uid", $scope.uid);
            console.log("added?", ref.key());
          });

            console.log("old rating", comment.rating);
           
            comments[comment.$id].rating += 1;
            console.log("new rating", comment.rating);
        }
        console.log("upVoteUsers", upVoteUsers);

        console.log("upVoteUsers.length", upVoteUsers.length);
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

