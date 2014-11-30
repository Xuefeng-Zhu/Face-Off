'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.when('/menu', {templateUrl: 'partials/menu.html', controller: 'MenuCtrl'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
