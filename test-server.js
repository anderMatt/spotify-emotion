const express = require('express'),
	app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res){
	console.log('Sending index page');
	return res.sendFile(__dirname + '/dist/index.html');
});

app.listen(3000, function(req, res){
	console.log('Express listening on port 3000');
});