'use strict';

var path = require('path');
var mongoose = require('mongoose');
var Todo = require('../models/models');

module.exports = function(app, socket) {

	socket.on('getTodos', function(data) {
		Todo.find(function(err, todos) {
			socket.emit('getAllTodos', todos);
			socket.broadcast.emit('getAllTodos', todos);
	    });        
    });

    socket.on('createTodo', function(data) {
        Todo.create({
            name : data.name,
            message : data.message
        }, function(err, todo) {
            socket.emit('newTodo', todo);
            socket.broadcast.emit('newTodo', todo);
        });
    });

    socket.on('removeTodo', function(data) {
    	Todo.remove({
	        _id : data.id
	    }, function(err, todo) {
	    	socket.emit('deleteTodo', data.id);
	    	socket.broadcast.emit('deleteTodo', data.id);
	    });
    });

	app.get('*', function(req, res) {
		res.sendFile(path.resolve('views/index.html'));
	});
}