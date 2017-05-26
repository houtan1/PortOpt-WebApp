// functions imported from stockMath
var stockExpect = require("../lib/stockMath").expect;
var stockRisk = require("../lib/stockMath").risk;
var stockCorrelation = require("../lib/stockMath").correlate;
var stockStrategy = require("../lib/stockMath").strategize;

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
