app.controller("HomeCtrl", ["$scope", "$firebaseArray", "$firebaseAuth", "$location", "uid",
  function($scope, $firebaseArray, $firebaseAuth, $location, uid) {
  var ref = new Firebase("https://band-library.firebaseio.com/");
  var auth = $firebaseAuth(ref);
  $scope.uid = ref.getAuth().uid

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


  function runPage() {
    console.log($scope.uid);
    $scope.searchCategories = "";      
    $scope.pieces = new $firebaseArray(ref.child('pieces'));


    $scope.addToUser = function(pin) {
      console.log(pin);
      $scope.pins.$add({
        "img": pin.img, 
        "tag": pin.tag,
        "title": pin.title,
        "url": pin.url,
        "uid": $scope.uid
      });
      $location.url("/personal");
    }; 
  
    $scope.addFromModal = function(pin) {
      console.log(pin);
      $scope.pins.$add({
        "img": pin.img, 
        "tag": pin.tag,
        "title": pin.title,
        "url": pin.url,
        "uid": $scope.uid
      });
    }; 

  }
}]);



