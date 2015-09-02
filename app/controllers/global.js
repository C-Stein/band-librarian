app.controller("GlobalCtrl", ["$scope", "$firebaseArray", "$firebaseAuth", "uid", "$location",
  function($scope, $firebaseArray, $firebaseAuth, uid, $location) {
  var ref = new Firebase("https://pinterest-project.firebaseio.com/");
  var auth = $firebaseAuth(ref);
  $scope.uid = uid.getUid();

  if (!!uid.isLoggedIn() && uid.isLoggedIn() !== null) {
    runPage();
  } else {
      ref.authWithOAuthPopup("github", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        console.log("$scope.uid", $scope.uid);
        runPage();
      }
    });    
  }

  function runPage() {
    $scope.uid = ref.getAuth().uid;
    console.log($scope.uid);
    $scope.searchCategories = "";      
    $scope.pins = new $firebaseArray(ref.child('pins'));


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
    $(document).on("click", "#pinMsg", function(){
      $(this).text("Pin has been added!").attr("disabled", "disabled");
    });
  }
}]);

