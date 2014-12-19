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
    .controller('SurveyCtrl', ['$scope', '$routeParams', '$location', '$http',
        function($scope, $routeParams, $location, $http) {
            var userID = $routeParams['userID'];
            $scope.questions = questions;

            setTimeout(ratingStar, 100);

            function ratingStar() {
                $('.ui.rating')
                    .rating({});
            }

            $scope.submitSurvey = function() {
                var rawRatings = $('.ui.rating').rating('getRating');
                var ratings = []
                for (var i = 0; i < rawRatings.length / 2; i++) {
                    if (rawRatings[i * 2] == 0 || rawRatings[i * 2 + 1] == 0) {
                        alert('Please finish all the questions before submission');
                        return;
                    }
                    ratings.push((rawRatings[i * 2] + rawRatings[i * 2 + 1]) / 2);
                }

                $http.post([url, 'others', userID + '.json'].join('/'), ratings)
                    .then(function() {
                        $location.path('/result/' + userID);
                    });
            }
        }
    ])
    .controller('ResultCtrl', ['$scope', '$routeParams', '$location', '$http',
        function($scope, $routeParams, $location, $http) {
            var userID = $routeParams['userID'];
            var categories = ['Social', 'Intelligence', 'Niceness', 'Methodical'];

            $http.get([url, 'self', userID + '.json'].join('/'))
                .then(function(response) {
                    var self = response.data;
                    $http.get([url, 'others', userID + '.json'].join('/'))
                        .then(function(response) {
                            var temp = response.data;
                            var size = 0
                            var others = [0, 0, 0, 0];
                            for (var i in temp) {
                                var other = temp[i];
                                size += 1
                                for (var c in other) {
                                    others[c] += other[c];
                                }
                            }
                            var data = [];
                            for (var i in others) {
                                data.push({
                                    'categories': categories[i],
                                    'name': 'self',
                                    'value': self[i]
                                });
                                data.push({
                                    'categories': categories[i],
                                    'name': 'others',
                                    'value': others[i] / size
                                });
                            }

                            console.log(data);
                            var visualization = d3plus.viz()
                                .container("#viz")
                                .data(data)
                                .type("bar")
                                .id("name")
                                .x("categories")
                                .y("value")
                                .draw()

                        })
                })
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

            $scope.submitSurvey = function() {
                var rawRatings = $('.ui.rating').rating('getRating');
                var ratings = []
                for (var i = 0; i < rawRatings.length / 2; i++) {
                    if (rawRatings[i * 2] == 0 || rawRatings[i * 2 + 1] == 0) {
                        alert('Please finish all the questions before submission');
                        return;
                    }
                    ratings.push((rawRatings[i * 2] + rawRatings[i * 2 + 1]) / 2);
                }

                $http.put([url, 'self', $rootScope.facebook.authResponse.userID + '.json'].join('/'), ratings);
            }
        }
    ]);