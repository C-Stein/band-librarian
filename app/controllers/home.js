app.controller("HomeCtrl", ["$scope", "$firebaseArray", "$firebaseAuth", "uid", "currentAuth",
  function($scope, $firebaseArray, $firebaseAuth, uid, currentAuth) {
  var ref = new Firebase("https://band-library.firebaseio.com/");
  // var auth = $firebaseAuth(ref);
  // var authData = ref.getAuth();
  // $scope._ = _;

  // console.log("ref.getAuth()", ref.getAuth());
  // console.log("ref", ref);
  // console.log("firebaseAuth(ref)", $firebaseAuth(ref));

  // if (!!uid.isLoggedIn() && uid.isLoggedIn() !== null) {
  //   runPage();
  // } else {
  //     ref.authWithOAuthPopup("facebook", function(error, authData) {
  //     if (error) {
  //       console.log("Login Failed!", error);
  //     } else {
  //       console.log("Authenticated successfully with payload:", authData);
  //       runPage();
  //     }
  //   });    
  // }

  // $scope.uid = authData.uid;

    $scope.searchCategories = "";      
    $scope.pieces = new $firebaseArray(ref.child('pieces')); 


  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  function routeTo(route) {
    window.location.href = '#/' + route;
  }

  $scope.logout = function () {
    console.log("logged out");
    ref.unauth();
    routeTo('/login');
  };

}]);





