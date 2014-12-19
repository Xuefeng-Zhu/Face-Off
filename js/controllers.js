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
    .controller('MenuCtrl', ['$scope', '$rootScope', '$location', '$routeParams',
        function($scope, $rootScope, $location, $routeParams) {
            $scope.questions = questions;

            if (!$rootScope.facebook) {
                alert("Login fails");
                $location.path('/login');
                return;
            }

            setTimeout(ratingStar, 1000);

            function ratingStar() {
                $('.ui.rating')
                    .rating({
                    });
            }

            console.log($rootScope.facebook);
            $scope.sendMessage = function() {
                FB.ui({
                    method: 'send',
                    link: "http://xuefeng-zhu.github.io/Song-Gradient/app/#/main"
                });
            }

        }
    ]);