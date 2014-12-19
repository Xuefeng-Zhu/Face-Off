'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'myApp.controllers'
]).
config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        });
        $routeProvider.when('/menu', {
            templateUrl: 'partials/menu.html',
            controller: 'MenuCtrl'
        });
        $routeProvider.when('/survey/:userID', {
            templateUrl: 'partials/survey.html',
            controller: 'SurveyCtrl'
        });
        $routeProvider.otherwise({
            redirectTo: '/login'
        });
    }
]);


var questions = ["This person keeps to him/herself (doesn’t talk a lot)",
    "This person generally starts conversations with others",
    "This person might have a rich vocabulary",
    "This person is quick to understand things",
    "This person tends to insult people all the time",
    "This person can sympathize with others’ feelings",
    "This person tends to miss deadlines frequently",
    "This person is complete in their work ethic (pays attention to small details)"
];