// Set it up
var express = require('express');
var stockRouter = express.Router();

// set up router function that returns stockRouter
var router = function() {
  // JSON array of stock info
  var stocks = [
    {
      name: 'StockA',
      monthly: [2, 1, 3, 2]
    },
    {
      name: 'StockB',
      monthly: [3, 7, -6, 4]
    }
  ];

  // define the routes in stockRouter
  stockRouter.route('/')
    .get(function(req, res) {
      res.render('stockListView', {
        title: 'stockListView',
        // send in our JSON array of stock info
        stock: stocks
      });
    });

  stockRouter.route('/:id')
    .get(function(req, res) {
      var id = req.params.id;
      res.render('stockView', {
        title: 'SingleStock',
        // send in our single JSON stock object
        stock: stocks[id]
      });
    });

    // return stockRouter, out of our function
    return stockRouter;
};

// export the router function so it can be pulled into app.js and useable
module.exports = router;
