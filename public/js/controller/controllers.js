hitsApp.controller("MainController", function ($scope, $http, $location) {
    $scope.title = "My Title";

    socket.on('newTodo', function(data) {
        $scope.todos.push(data);
        $scope.$apply();
    });

    socket.on('getAllTodos', function(todos) {
        $scope.todos = todos;
        $scope.$apply();
    });

    socket.on('deleteTodo', function(id) {
        for(var row in $scope.todos) {
            if ($scope.todos[row]._id == id) {
                $scope.todos.splice(row, 1);
            };
        }
        $scope.$apply();
    });


    var socketEmitFn = function(eName, data) {
        socket.emit(eName, data);
    }

    socketEmitFn('getTodos', {});

    $scope.addTodo = function() {
        var postData = {
            name: $scope.todoForm.name.$modelValue,
            message: $scope.todoForm.message.$modelValue
        }
        socketEmitFn('createTodo', postData);
        $scope.name = '';
        $scope.message = '';
    }

    $scope.removeTodo = function(_id) {
        socket.emit('removeTodo', {id: _id});
    }
});