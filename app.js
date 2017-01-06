const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Require routes
const index = require('./routes/index');
const hook = require('./routes/hook');

// Load config
const config = require('./config');

// Initialize express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('combined'));
app.set('port', config.port);

// Declare routes
app.use('/', index);
app.use('/hook', hook);

// Turn on global logging for debugging
const globalLog = require('global-request-logger');
globalLog.initialize();
globalLog.on('success', function(request, response) {
	console.log('SUCCESS');
	console.log('Request', request);
	console.log('Response', response);
});
globalLog.on('error', function(request, response) {
	console.log('ERROR');
	console.log('Request', request);
	console.log('Response', response);
});

// Start express server
const server = app.listen(process.env.PORT || config.port, () => {
	let port = server.address().port;
	console.log(`Server listening on port %s`, port);
});

module.exports = app;
