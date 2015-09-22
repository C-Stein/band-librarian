app.controller("AuthCtrl", ["$scope", "$firebaseAuth", "uid",
  function($scope, $firebaseAuth, uid) {

  var ref = new Firebase("https://band-library.firebaseio.com/");
  var auth = $firebaseAuth(ref);
  var authData = ref.getAuth();
  $scope._ = _;

  console.log("ref.getAuth()", ref.getAuth());
  console.log("ref", ref);
  console.log("firebaseAuth(ref)", $firebaseAuth(ref));


  function routeTo(route) {
    window.location.href = '#/' + route;
  }

    // Handle third party login providers
  function thirdPartyLogin(provider) {
    var deferred = $.Deferred();
    console.log("thirdPartyLogin");

    ref.authWithOAuthPopup(provider, function (err, user) {
      if (err) {
        deferred.reject(err);
      }
      if (user) {
        deferred.resolve(user);
      }
    });

    return deferred.promise();
  }

    // Handle Email/Password login (reserved for future use)
  function authWithPassword(userObj) {
    var deferred = $.Deferred();
    console.log(userObj);
    ref.authWithPassword(userObj, function onAuth(err, user) {
      if (err) {
        deferred.reject(err);
      }
      if (user) {
            deferred.resolve(user);
      }
    });
    return deferred.promise();
  }

    // Create a user and then login in
    // returns a promise
    // function createUserAndLogin(userObj) {
    //     return createUser(userObj)
    //         .then(function () {
    //         return authWithPassword(userObj);
    //     });
    // }

    // authenticate anonymously
  function authAnonymously() {
    var deferred = $.Deferred();
    console.log("anonymouse login");
    ref.authAnonymously(function (err, authData) {
      if (authData) {
        deferred.resolve(authData);
      }
      if (err) {
        deferred.reject(err);
      }
    });
    return deferred.promise();
  }

    // route to the specified route if sucessful
    // if there is an error, show the alert
  function handleAuthResponse(promise, route) {
    $.when(promise)
      .then(function (authData) {
        console.log(authData.uid);
        uid.addUid(authData.uid);
        console.log("getter", uid.getUid());
        routeTo(route);
      }, function (err) {
          console.log(err);
        });
  }


  $scope.login = function(provider) {
    var socialLoginPromise;

    socialLoginPromise = thirdPartyLogin(provider);
    handleAuthResponse(socialLoginPromise, '/');

  };

  $scope.loginAnon = function() {
    handleAuthResponse(authAnonymously(), '/');
  };


}]);