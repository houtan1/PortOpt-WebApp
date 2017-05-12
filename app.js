// The main file. Include the required modules at the top. Start Express.
// from https://www.npmjs.com/package/express
var express = require('express');
var app = express();
var port = 3000;

// import functions from dummyData.js
var dummyData = require("./lib/dummyData").data;

// using EJS as templating engine to compose and serve up index.html
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Render the html page using EJS and pass variables to it
app.get('/', function(req, res) {
  res.render('index', {
    stockA: dummyData.fetch('A'),
    stockB: dummyData.fetch('B')
  });
});

// start it up, the function(err) is a callback function...
app.listen(port, function(err) {
  console.log('Running server on port ' + port);
});
console.log("Server ready...");
console.log("Go to a web browser and navigate to localhost:3000");
console.log("Stop the server by using Ctrl+C");
