'use strict';
/* Controllers */
var url = "https://face-off.firebaseio.com/"

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
            $scope.questions = questions;

            setTimeout(ratingStar, 100);

            function ratingStar() {
                $('.ui.rating')
                    .rating({});
            }
        }
    ])
    .controller('MenuCtrl', ['$scope', '$rootScope', '$location', '$http',
        function($scope, $rootScope, $location, $http) {
            if (!$rootScope.facebook) {
                alert('Login fails');
                $location.path('/login');
                return;
            }

            $scope.questions = questions;

            setTimeout(ratingStar, 100);

            function ratingStar() {
                $('.ui.rating')
                    .rating({});
            }

            var link = ['http://xuefeng-zhu.github.io/Face-Off#', 'survey', $rootScope.facebook.authResponse.userID].join('/');
            link = 'http://xuefeng-zhu.github.io/Face-Off/#/survey/568715569930034'.toString();
            $scope.sendMessage = function() {
                FB.ui({
                    method: 'send',
                    link: link
                });
            };

            $scope.submitSurvey = function(){
                var rawRatings = $('.ui.rating').rating('getRating');
                var ratings = []
                for (var i = 0; i < rawRatings.length / 2; i++){
                    if (rawRatings[i * 2] == 0 || rawRatings[i * 2 + 1] == 0){
                        alert('Please finish all the questions before submission');
                        return;
                    }

                    ratings.push((rawRatings[i * 2]+rawRatings[i * 2 + 1]) / 2);
                }

                $http.put([url, 'self',  $rootScope.facebook.authResponse.userID + '.json'].join('/'), ratings); 
            }
        }
    ]);