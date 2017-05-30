// functions imported from stockMath
var stockExpect = require("../lib/stockMath").expect;
var stockRisk = require("../lib/stockMath").risk;
var stockCorrelation = require("../lib/stockMath").correlate;
var stockStrategy = require("../lib/stockMath").strategize;
var stockReturn = require("../lib/stockMath").return;

// JSON array of stock info for testing
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

var stocksR = [
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
  }
];

// tests
exports ["Calculate the expectation (mean) of a stock"] = function(test) {
  // send in a stock to evaluate its expectation
  var expecation = stockExpect(stocks[0]);
  // Assertion (2+1+3+2)/(4)=2
  test.equal(expecation, 2);
  // end of test
  test.done();
};

exports ["Calculate the risk (variance) of a stock"] = function(test) {
  // send in a stock to evaluate its risk
  var risk = stockRisk(stocks[1]);
  // Assertion (1/4)((3-2)^2 + (7-2)^2 + (-6-2)^2 + (4-2)^2) = 94/4 = 23.5
  test.equal(risk, 23.5);
  // end of test
  test.done();
};

exports ["Calculate the correlation between two stocks"] = function(test) {
  // send in two stocks to determine their correlation
  var correlation = stockCorrelation(stocks[0], stocks[1]);
  // Assertion Rho_AB = -0.948 rounded to 3 decimal places
  test.equal(correlation, -0.948);
  // end of test
  test.done();
};

exports ["Calculate investment strategy for pair of stocks"] = function(test) {
  // send in a pair of stocks and a desired return to get an investment strategy
  var strategy = stockStrategy(stocks[0], stocks[2], 3.5);
  // Assertion strategy = [0.25, 0.75, 50.469]
  test.equal(strategy[0], 0.25); // % invested in stock A
  test.equal(strategy[1], 0.75); // % invested in stock C
  test.equal(strategy[2], 50.469); // the risk of this strategy
  // end of test
  test.done();
};

exports ["Calculate the difference in return given raw data"] = function(test) {
  // send in 12 monthly closing prices of a stockRouter
  var diffs = stockReturn(stocksR[0]);
  // Assertion monthly: [(51.17-53), (56.68-51.17), (57.46-56.68), etc]
  for (var i = 0; i < stocksR[0].actual.length - 1; i++) {
    test.equal(diffs[i], stocksR[0].monthly[i]);
  }
  // end of test
  test.done();
};
