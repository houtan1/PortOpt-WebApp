// The main file. Include the required modules at the top. Start Express.
// from https://www.npmjs.com/package/express
var express = require('express');
var app = express();
var port = 3000;

// set up a router for stocks
var stockRouter = require('./src/routes/stockRoutes')();

// use stockRouter to handle requests to /
app.use('/', stockRouter);

// using EJS as templating engine to compose and serve up index.html
app.set('views', './src/views');
app.set('view engine', 'ejs');

// start it up, the function(err) is a callback function...
app.listen(port, function(err) {
  console.log('Running server on port ' + port);
});
console.log("Server ready...");
console.log("Go to a web browser and navigate to localhost:3000/stocks");
console.log("Stop the server by using Ctrl+C");
