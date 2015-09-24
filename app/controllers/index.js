app.controller("IndexCtrl", ["$scope", "logout",
  function($scope, logout) {

  $scope.logout = function () {
    logout.logout();
  };

}]);