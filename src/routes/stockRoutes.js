// Set it up
var express = require('express');
var stockRouter = express.Router();

// functions imported from stockMath
var stockExpect = require("../../lib/stockMath").expect;
var stockRisk = require("../../lib/stockMath").risk;
var stockCorrelation = require("../../lib/stockMath").correlate;

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
        stock: stocks,
        correlation: stockCorrelation(stocks[0], stocks[1])
      });
    });

  // individual stock route with chrome fix
  // show the expectation and risk of each stock
  stockRouter.route('/:id')
    .get(function(req, res) {
      var id = req.params.id;
      if (id != 'favicon.ico') {
        res.render('stockView', {
          title: 'SingleStock',
          // send in our single JSON stock object
          stock: stocks[id],
          expectation: stockExpect(stocks[id]),
          risk: stockRisk(stocks[id])
        });
      }
    });

  // this runs into an issue with chrome, when it requests
  // localhost:3000/favicon.ico, and our route captures that as an id
  // leading to a poor attempt at sending stock[favicon.ico] through to
  // stockView.ejs; this would be a nonissue if I used a path like
  // localhost:3000/stock/id instead of just localhost:3000/id
  /*
  stockRouter.route('/:id')
    .get(function(req, res) {
      var id = req.params.id;
      res.render('stockView', {
        title: 'SingleStock',
        // send in our single JSON stock object
        stock: stocks[id]
      });
    });
    */

    // return stockRouter, out of our function
    return stockRouter;
};

// export the router function so it can be pulled into app.js and useable
module.exports = router;
