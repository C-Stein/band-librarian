app.controller("AuthCtrl", ["$scope", "$firebaseAuth", "uid",
  function($scope, $firebaseAuth, uid) {

  var ref = new Firebase("https://band-library.firebaseio.com/");
  var auth = $firebaseAuth(ref);
  var authData = ref.getAuth();
  $scope._ = _;

  console.log("ref.getAuth()", ref.getAuth());
  console.log("ref", ref);
  console.log("firebaseAuth(ref)", $firebaseAuth(ref));

  // if (!!uid.isLoggedIn() && uid.isLoggedIn() !== null) {
  
  // } else {
  //     ref.authWithOAuthPopup("facebook", function(error, authData) {
  //      if (error) {
  //       console.log("Login Failed!", error);
  //      } else {
  //       console.log("Authenticated successfully with payload:", authData);
  //      }
  //   });    
  // }

  //////////////





    // pair our routes to our form elements and controller
    var routeMap = {
        '#/': {
            form: 'frmLogin',
            controller: 'login'
        },
    };

    // create the object to store our controllers
    var controllers = {};

    // store the active form shown on the page
    var activeForm = null;

    var alertBox = $('#alert');

    function routeTo(route) {
        window.location.href = '#/' + route;
    }

    // Handle third party login providers
    // returns a promise
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

    // Handle Email/Password login
    // returns a promise
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
    function createUserAndLogin(userObj) {
        return createUser(userObj)
            .then(function () {
            return authWithPassword(userObj);
        });
    }

    // authenticate anonymously
    // returns a promise
    function authAnonymously() {
        var deferred = $.Deferred();
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

            // route
            routeTo(route);

        }, function (err) {
            console.log(err);
            // pop up error
            showAlert({
                title: err.code,
                detail: err.message,
                className: 'alert-danger'
            });

        });
    }

    // options for showing the alert box
    function showAlert(opts) {
        var title = opts.title;
        var detail = opts.detail;
        var className = 'alert ' + opts.className;

        alertBox.removeClass().addClass(className);
        alertBox.children('#alert-title').text(title);
        alertBox.children('#alert-detail').text(detail);
    }

    /// Controllers
    ////////////////////////////////////////

    // controllers.login = function (form) {

        // Form submission for logging in
        // form.on('submit', function (e) {

        //     var userAndPass = $(this).serializeObject();
        //     var loginPromise = authWithPassword(userAndPass);
        //     e.preventDefault();

        //     handleAuthResponse(loginPromise, '/');

        // });

        // Social buttons

console.log("I'm here!");

        $scope.login = function(provider) {

            var socialLoginPromise;
            console.log("provider", provider);

            socialLoginPromise = thirdPartyLogin(provider);
            handleAuthResponse(socialLoginPromise, '/');

        };

        // form.children('#btAnon').on('click', function (e) {
        //     e.preventDefault();
        //     handleAuthResponse(authAnonymously(), '/');
        // });

    // };

    // logout immediately when the controller is invoked




    
    /// Routing
    ////////////////////////////////////////

    // Handle transitions between routes
    // function transitionRoute(path) {
    //     // grab the config object to get the form element and controller
    //     var formRoute = routeMap[path];
    //     var currentUser = ref.getAuth();

    //     // if authentication is required and there is no
    //     // current user then go to the register page and
    //     // stop executing
    //     if (formRoute.authRequired && !currentUser) {
    //         routeTo('register');
    //         return;
    //     }

    //     // wrap the upcoming form in jQuery
    //     var upcomingForm = $('#' + formRoute.form);

    //     // if there is no active form then make the current one active
    //     if (!activeForm) {
    //         activeForm = upcomingForm;
    //     }

    //     // hide old form and show new form
    //     activeForm.hide();
    //     upcomingForm.show().hide().fadeIn(750);

    //     // remove any listeners on the soon to be switched form
    //     activeForm.off();

    //     // set the new form as the active form
    //     activeForm = upcomingForm;

    //     // invoke the controller
    //     controllers[formRoute.controller](activeForm);
    // }

    // // Set up the transitioning of the route
    // function prepRoute() {
    //     transitionRoute(this.path);
    // }


    /// Routes
    ///  #/         - Login
    //   #/logout   - Logut
    //   #/register - Register
    //   #/profile  - Profile

    // Path.map("#/").to(prepRoute);
    // Path.map("#/logout").to(prepRoute);
    // Path.map("#/register").to(prepRoute);
    // Path.map("#/profile").to(prepRoute);

    // Path.root("#/");

    /// Initialize
    ////////////////////////////////////////

    $(function () {

        // Start the router
        // Path.listen();

        // whenever authentication happens send a popup
        ref.onAuth(function globalOnAuth(authData) {

            if (authData) {
                showAlert({
                    title: 'Logged in!',
                    detail: 'Using ' + authData.provider,
                    className: 'alert-success'
                });
            } else {
                showAlert({
                    title: 'You are not logged in',
                    detail: '',
                    className: 'alert-info'
                });
            }

        });

    });

  }]);