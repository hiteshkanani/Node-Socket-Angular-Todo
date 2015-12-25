hitsApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/todos.html',
            controller: 'MainController'
        }).otherwise({
            redirectTo: '/'
        });
});