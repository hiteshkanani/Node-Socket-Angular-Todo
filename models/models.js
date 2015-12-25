'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
	time: {
		type: Date,
		default: Date.now
	},
	name: String,
	message: String
});