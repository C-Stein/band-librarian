app.controller("HomeCtrl", ["$scope", "$firebaseArray", "$firebaseAuth", "uid",
  function($scope, $firebaseArray, $firebaseAuth, uid) {
  var ref = new Firebase("https://band-library.firebaseio.com/");
  var auth = $firebaseAuth(ref);
  var authData = ref.getAuth();
  $scope._ = _;

  console.log("ref.getAuth()", ref.getAuth());
  console.log("ref", ref);
  console.log("firebaseAuth(ref)", $firebaseAuth(ref));

  if (!!uid.isLoggedIn() && uid.isLoggedIn() !== null) {
    runPage();
  } else {
      ref.authWithOAuthPopup("github", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        runPage();
      }
    });    
  }

  $scope.uid = authData.uid;

  function runPage() {
    console.log($scope.uid);
    $scope.searchCategories = "";      
    $scope.pieces = new $firebaseArray(ref.child('pieces')); 

  }
}]);



 







