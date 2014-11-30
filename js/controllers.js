'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('LoginCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
    $scope.login = function() {
        Todo.startSession({
            email: $scope.email,
            password: $scope.password,
            success: function(user) {
                $rootScope.user = user; 
                $location.path('/lists/incomplete');
                $scope.$apply();
            },
            error: function(xhr) {
                alert(xhr.responseJSON.error);
            }
        });
    }

}])
.controller('RegisterCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
    $scope.register = function() {
    	if ($scope.password1 != $scope.password2){
    		alert('Passwords do not match');
    		return;
    	}

        Todo.createUser({
            email: $scope.email,
            password: $scope.password1,
            success: function(user) {
                $rootScope.user = user; 
                $location.path('/lists/incomplete');
                $scope.$apply();
            },
            error: function(xhr) {
               alert([$scope.email,xhr.responseJSON.email[0]].join(' '));
            }
        });
    }
}])
.controller('ListsCtrl', ['$scope','$rootScope', '$location', '$routeParams', function($scope, $rootScope, $location, $routeParams){
    if (!$rootScope.user){
        alert("Login fails");
        $location.path('/login');
        return;
    }

    if ($routeParams['status'] == 'complete'){
       $scope.status = true; 
    }
    else{
        $scope.status = false;
    }
    
    Todo.loadTodos({
        success: function(todos) {
            $scope.todos = [];
            for (var i in todos){
                if (todos[i].is_complete == $scope.status){
                    $scope.todos.push(todos[i]);
                }
            }
            $scope.$apply();
        },
        error: function(xhr) {
            alert("Fail to load list");
        }
    });

	$scope.addTodo = function(){
        Todo.createTodo({
            todo: {description: $scope.newTodo},
            success: function(todo){
                $scope.todos.push(todo);
                $scope.newTodo = null;
                $scope.$apply();
            },
            error: function(xhr) {
                alert("An error occurs when you are trying to add a todo");
            }
        })
    }

    $scope.toggleTodo = function(id) {
        setTimeout(function() {
            Todo.updateTodo({
                todoId: $scope.todos[id].id,
                data: {
                    is_complete: !$scope.todos[id].is_complete
                },
                success: function() {
                    $scope.todos[id].is_complete = !$scope.todos[id].is_complete;
                    $scope.$apply();
                },
                error: function(xhr) {
                    alert('todo update error!')
                }
            });
        }, 100);
    }

    $scope.editTodo = function(id) {
        $scope.editing = {
            text: $scope.todos[id].description,
            id: id
        };
    }

    $scope.doneEdit = function(){
         Todo.updateTodo({
                todoId: $scope.todos[$scope.editing.id].id,
                data: {
                    description: $scope.editing.text
                },
                success: function() {
                    $scope.todos[$scope.editing.id].description = $scope.editing.text;
                    $scope.editing = null;
                    $scope.$apply();
                },
                error: function(xhr) {
                    alert('todo update error!')
                }
            });
    }
}]);