// functions imported from stockExpect
var stockExpect = require("../lib/stockMath").expect;

// JSON array of stock info for testing
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

// tests
exports["Calculate the expectation (mean) of a stock"] = function (test) {
  // send in a stock to evaluate its expectation
  var expecation = stockExpect(stocks[0]);
  // Assertion (2+1+3+2)/(4)=2
  test.equal(expecation, 2);
  //end of test
  test.done();
};
