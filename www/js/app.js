// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

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

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider
    .state('tabs', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

     .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'templates/home.html'
        }
      }
    })

    .state('tabs.list', {
      url: '/list',
      views: {
        'list-tab': {
          templateUrl: 'templates/list.html',
          controller: 'ArtistController'
        }
      }
    })

    .state('tabs.detail', {
      url: '/list/:artistId',
      views: {
        'list-tab': {
          templateUrl: 'templates/detail.html',
          controller: 'ArtistController'
        }
      }
    })

    .state('tabs.calendar', {
      url: '/calendar',
      views: {
        'calendar-tab': {
          templateUrl: 'templates/calendar.html',
          controller: 'CalendarController'
        }
      }
    })

    $urlRouterProvider.otherwise('/tab/home');
})

.controller('CalendarController', [ "$scope" , "$http", "$state" ,
  function($scope, $http, $state) {
    $http.get("js/data.json").success(function(data) {
      $scope.calendar = data.calendar;

    
      $scope.deleteItem = function(dayIndex, calendarItem) {
        $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex]
          .schedule.indexOf(calendarItem), 1);  
      };

      $scope.toggleFavState = function(artist) {
        console.log('toggle artist fav state');
        artist.star = !artist.star;
      }

      $scope.doRefresh = function() {
        $http.get('js/data.json').success(function(data) {
          $scope.calendar = data.calendar;
          $scope.broadcast('scroll.refreshComplete');
        });
      }
    });
}])

.controller('ArtistController', [ "$scope" , "$http", "$state" ,
  function($scope, $http, $state) {
    $http.get("js/data.json").success(function(data) {
      $scope.artists = data.artists;
      $scope.whichArtist = $state.params.artistId;
      $scope.data = { showDelete: false, showReorder: false };

      $scope.moveItem = function(artist, fromIndex, toIndex) {
        console.log('hello '+fromIndex+"  " +toIndex);
        $scope.artists.splice(fromIndex, 1);
        $scope.artists.splice(toIndex, 0, artist);
      };

      $scope.deleteItem = function(artist) {
        console.log('popping the shit out of it');
        $scope.artists.splice($scope.artists.indexOf(artist), 1);  
      };

      $scope.toggleFavState = function(artist) {
        console.log('toggle artist fav state');
        artist.star = !artist.star;
      };

       $scope.doRefresh = function() {
        $http.get('js/data.json').success(function(data) {
          $scope.artists = data.artists;
          $scope.broadcast('scroll.refreshComplete');
        });
      }

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