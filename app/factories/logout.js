app.factory("logout", function() {

  var ref = new Firebase("https://band-library.firebaseio.com/");
  
  function routeTo(route) {
    window.location.href = '#/' + route;
  }

  return {
    logout: function() {
      console.log("logged out");
      ref.unauth();
      routeTo('/login');
    }
  };
});