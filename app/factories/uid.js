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

// *Set it as a dependency in a controller