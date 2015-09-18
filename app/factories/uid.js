app.factory("uid", function() {
  var uid;
  var ref = new Firebase("https://band-library.firebaseio.com/");


  return {
    addUid: function(user) {
       uid = user;
      return uid;
    },
    getUid: function () {
        return uid;
    },
    isLoggedIn: function() {
        return !!ref.getAuth();
    }
  };
});

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://band-library.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);