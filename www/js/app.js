// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('ArtistController', [ "$scope" , "$http" ,function($scope, $http) {
    $http.get("js/data.json").success(function(data) {
      $scope.artists = data;

      $scope.moveItem = function(artist, fromIndex, toIndex) {
        console.log('hello '+fromIndex+"  " +toIndex);
        $scope.artists.splice(fromIndex, 1);
        $scope.artists.splice(toIndex, 0, artist);
      };
    });
}]);

/*.controller('TodoController', function($scope, 
  $ionicPopup, $ionicListDelegate) {
  $scope.tasks = 
  [
    { title: "First todo", completed: true},
    { title: "Second todo", completed: false},
    { title: "Third todo", completed: false}
  ];

  $scope.createNewTask = function() {
  $ionicPopup.prompt ({
    title: "New Task",
    template: "Enter Task",
    inputPlaceholder: "What do you need to do?",
    okText: "Create task"
  }).then(function(res) {   //promise wtf y?
      if(res) $scope.tasks.push({title: res, completed: false});
  })
};

$scope.editTask = function(task) {
  $scope.data = {response: task.title};
   $ionicPopup.prompt ({
    title: "Edit Task",
    scope: $scope
  }).then(function(res) {   //promise wtf y?
      if(res !== undefined) task.title = $scope.data.response;
      $ionicListDelegate.closeOptionButtons();
  })
}

});*/