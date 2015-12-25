var express = require('express'),
	app = module.exports = express(),
	server = require('http').Server(app),
	io = require('socket.io')(server),
	path    = require('path'),
	mongoose = require('mongoose'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/node-socket'); 

app.set('port', process.env.PORT || 8080);
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

io.on('connection', function (socket) {
	require('./routes/routes.js')(app, socket);  
});

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

exports = module.exports = app;