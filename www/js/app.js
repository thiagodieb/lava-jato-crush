(function() {
  'use strict';

  // Ionic Memory Game
  angular.module('memory', ['ionic', 'memory.services', 'memory.directives', 'memory.controllers'])
    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    })

    .config(function($httpProvider) {
      $httpProvider.interceptors.push(function($rootScope) {
        return {
          request: function(config) {
            $rootScope.$broadcast('loading:show');
            return config;
          },
          response: function(response) {
            $rootScope.$broadcast('loading:hide');
            return response;
          }
        };
      });
    })

    .run(function($rootScope, $ionicLoading) {
      $rootScope.$on('loading:show', function() {
        $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
      });

      $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide();
      });
    })

    .config(function($stateProvider, $urlRouterProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider
        .state('index', {
          url: '/',
          abstract: true,
          templateUrl: 'templates/header.html',
          controller: 'AppCtrl'
        })
        .state('home', {
          url: '/home',
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        })
        .state('game-easy', {
          url: '/game-easy',
          templateUrl: 'templates/crush.html',
          controller: 'GameCtrl',
          resolve: {
            config_crush: function(){
              return {rows:4,height:50};
            }
          }
        })
        .state('game-difficult', {
          url: '/game-difficult',
          templateUrl: 'templates/crush.html',
          controller: 'GameCtrl',
          resolve: {
            config_crush: function(){
              return {rows:6,height:35};
            }
          }
        })
        .state('game-hard', {
          url: '/game-hard',
          templateUrl: 'templates/crush.html',
          controller: 'GameCtrl',
          resolve: {
            config_crush: function(){
              return {rows:8,height:25};
            }
          }
        });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');
    });
}());