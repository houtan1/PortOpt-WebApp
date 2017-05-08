// The main file. Include the required modules at the top. Start Express.
// from https://www.npmjs.com/package/express
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000);
console.log("Server ready...");
console.log("Go to a web browser and navigate to localhost:3000");
console.log("Stop the server by using Ctrl+C");
