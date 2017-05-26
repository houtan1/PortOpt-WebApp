// Set it up
var express = require('express');
var stockRouter = express.Router();

// functions imported from stockMath
var stockExpect = require("../../lib/stockMath").expect;
var stockRisk = require("../../lib/stockMath").risk;
var stockCorrelation = require("../../lib/stockMath").correlate;
var stockStrategy = require("../../lib/stockMath").strategize;

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
    },
    {
      name: 'StockC',
      monthly: [6, 14, -12, 8]
    }
  ];

  // define the routes in stockRouter
  stockRouter.route('/').get(function(req, res) {
    res.render('stockListView', {
      title: 'stockListView',
      // send in our JSON array of stock info
      stock: stocks
    });
  });

  stockRouter.route('/pair').get(function(req, res) {
    var id1 = req.query.index[0];
    var id2 = req.query.index[1];
    var exp1 = stockExpect(stocks[id1]);
    var exp2 = stockExpect(stocks[id2]);
    if (exp1 <= exp2) {
      var expMin = exp1;
      var expMax = exp2;
    } else {
      var expMin = exp2;
      var expMax = exp1;
    }
    res.render('pairBoundsView', {
      title: 'pairBoundsView',
      id1: id1,
      id2: id2,
      stockA: stocks[id1],
      stockB: stocks[id2],
      correlation: stockCorrelation(stocks[id1], stocks[id2]),
      expMin: expMin,
      expMax: expMax
    });
  });

  stockRouter.route('/strategy/:id1-:id2').get(function(req, res) {
    var id1 = req.params.id1;
    var id2 = req.params.id2;
    var exp = req.query.value;
    res.render('strategyView', {
      title: 'strategyView',
      stockA: stocks[id1],
      stockB: stocks[id2],
      exp: exp,
      strategy: stockStrategy(stocks[id1], stocks[id2], exp)
    });
  });

  stockRouter.route('/info/:id').get(function(req, res) {
    var id = req.params.id;
    res.render('stockView', {
      title: 'SingleStock',
      // send in our single JSON stock object
      stock: stocks[id],
      expectation: stockExpect(stocks[id]),
      risk: stockRisk(stocks[id])
    });
  });

  // individual stock route with chrome fix
  // show the expectation and risk of each stock
  // turn this to /info/:id
  /*
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
    */

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
