'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.when('/register', {templateUrl: 'partials/register.html', controller: 'RegisterCtrl'});
  $routeProvider.when('/lists/:status', {templateUrl: 'partials/lists.html', controller: 'ListsCtrl'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
