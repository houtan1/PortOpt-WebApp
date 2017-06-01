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
  var stocksOld = [
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

  // Real JSON Data (hard coded) 5 stocks, 9 months, start April 28 and back
  // e.g. monthly: [(57.60-57.46), (59.92-57.60), (60.26-59.92), etc.]
  var stocks = [
    {
      name: 'MSFT',
      actual: [68.46, 65.86, 63.98, 64.65, 62.14, 60.26, 59.92, 57.60, 57.46,
        56.68, 51.17, 53],
      monthly: [-1.83, 5.51, 0.78, 0.14, 2.32, 0.34, 1.88, 2.51, -0.67, 1.88, 2.6]
    },
    {
      name: 'IBM',
      actual: [160.29, 174.14, 179.82, 174.52, 165.99, 162.22, 153.69, 158.85,
        158.88, 160.62, 151.78, 153.74],
      monthly: [-1.96, 8.84, -1.74, -0.03, -5.16, 8.53, 3.77, 8.53, 5.3, -5.68,
        -13.85]
    },
    {
      name: 'TEAM',
      actual: [34.48, 29.95, 28.44, 27.63, 24.08, 27.14, 26.86, 29.97, 29.48,
        29.97, 25.9, 22.57],
      monthly: [3.33, 4.07, -0.49, 0.49, -3.11, 0.28, -3.06, 3.55, 0.81, 1.51,
        4.53]
    },
    {
      name: 'TSLA',
      actual: [314.07, 278.3, 249.99, 251.93, 213.69, 189.4, 197.73, 204.03,
        212.01, 234.79, 212.28, 223.23],
      monthly: [-10.95, 22.51, -22.78, -7.98, -6.3, -8.33, 24.29, 38.24, -1.94,
        28.31, 35.77]
    },
    {
      name: 'XOM',
      actual: [81.65, 82.01, 81.32, 83.89, 90.26, 87.3, 83.32, 87.28, 87.14,
         88.95, 93.74, 89.02],
      monthly: [4.72, -4.79, -1.81, 0.14, -3.96, 3.98, 2.96, -6.37, -2.57, 0.69,
        -0.36]
    },
    {
      name: 'BHP',
      actual: [35.6, 36.32, 37.82, 41.29, 35.78, 37.54, 35.02, 34.65, 30,
        29.69, 28.56, 26.97],
      monthly: [1.59, 1.13, 0.31, 4.65, 0.37, 2.52, -1.76, 5.51, -3.47, -1.5,
        -0.72]
    }
  ];

  // define the routes in stockRouter
  stockRouter.route('/').get(function(req, res) {
    var exp = [];
    var rsk = [];
    for (var i = 0; i < stocks.length; i++) {
      exp[i] = stockExpect(stocks[i]);
      rsk[i] = stockRisk(stocks[i]);
    }
    res.render('stockListView', {
      title: 'stockListView',
      // send in our JSON array of stock info
      stock: stocks,
      expectation: exp,
      risk: rsk
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

  // no longer a need for this route
  /*
  stockRouter.route('/info/:id').get(function(req, res) {
    var id = req.params.id;
    res.render('stockView', {
      title: 'SingleStock',
      // send in our single JSON stock object
      stock: stocks[id],
      expectation: stockExpect(stocks[id]),
      risk: stockRisk(stocks[id])
    });
  });*/

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
