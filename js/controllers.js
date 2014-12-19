'use strict';
/* Controllers */
angular.module('myApp.controllers', [])
    .controller('LoginCtrl', ['$scope', '$rootScope', '$location',
        function($scope, $rootScope, $location) {
            $scope.login = function() {
                FB.login(function(response) {
                    $rootScope.facebook = response;
                    $location.path('/menu');
                    $rootScope.$apply();
                });
            }
        }
    ])
    .controller('SurveyCtrl', ['$scope', '$routeParams', '$location',
        function($scope, $routeParams, $location) {
            var userID = $routeParams['userID'];
            console.log(userID);
            $scope.questions = questions;

        }
    ])
    .controller('MenuCtrl', ['$scope', '$rootScope', '$location', '$routeParams',
        function($scope, $rootScope, $location, $routeParams) {
            $scope.questions = questions;
            if (!$rootScope.facebook) {
                alert('Login fails');
                $location.path('/login');
                return;
            }
            var tmp = ['http://xuefeng-zhu.github.io/Face-Off', 'survey', $rootScope.facebook.authResponse.userID].join('/');
            setTimeout(ratingStar, 1000);

            function ratingStar() {
                $('.ui.rating')
                    .rating({});
            }
            $scope.sendMessage = function() {
                FB.ui({
                    method: 'send',
                    link: tmp
                });
            }
        }
    ]);