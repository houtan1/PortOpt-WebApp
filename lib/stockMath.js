// load Math.js package, https://www.npmjs.com/package/mathjs
// documentation: http://mathjs.org/docs/reference/functions.html
var math = require('mathjs');

// Performs mathematical analysis of given JSON stocks
var stockExpect = function(stock) {
  var count = stock.monthly.length;
  var sum = 0;
  for (var i = 0; i < count; i++) {
    sum += stock.monthly[i];
  }
  return math.round(sum/count, 2);
};

var stockRisk = function(stock) {
  var count = stock.monthly.length;
  var mean = stockExpect(stock);
  var difsOfMean = 0;
  for (var i = 0; i < count; i++) {
    difsOfMean += math.pow((stock.monthly[i] - mean), 2);
  }
  return math.round(difsOfMean/count, 3);
};

var stockCorrelation = function(stockA, stockB) {
  var countA = stockA.monthly.length;
  var countB = stockB.monthly.length;
  if (countA != countB) return false;
  var meanA = stockExpect(stockA);
  var meanB = stockExpect(stockB);
  var varianceA = stockRisk(stockA);
  var varianceB = stockRisk(stockB);
  var numerator = 0;
  for (var i = 0; i < countA; i++) {
    numerator += (stockA.monthly[i] - meanA)*(stockB.monthly[i] - meanB);
  }
  numerator = numerator/countA;
  var stdDev = math.sqrt(varianceA) * math.sqrt(varianceB);
  return math.round(numerator/stdDev, 3);
};

// Given a pair of stocks and a return goal, calculates an investment strategy
var stockStrategy = function(stockA, stockB, goal) {
  var countA = stockA.monthly.length;
  var countB = stockB.monthly.length;
  // ensures both sets of data are of the same length
  if (countA != countB) return false;
  var meanA = stockExpect(stockA);
  var meanB = stockExpect(stockB);
  // checks to see if the desired return is within the possible range
  if ((goal < meanA && goal < meanB) || (goal > meanA && goal > meanB))
    return false;
  var varianceA = stockRisk(stockA);
  var varianceB = stockRisk(stockB);
  var correlation = stockCorrelation(stockA, stockB);
  // ensures the pair of candidate stocks are negatively correlated
  if (correlation > 0) return false;
  // if both stocks have the same expectation, suggest the lower risk stock
  if (meanA == meanB) {
    if (varianceA <= varianceB) {
      return [1, 0, varianceA];
    } else {
      return [0, 1, varianceB];
    }
  }
  // calculate the investment strategy
  var percentB = (goal - meanA)/(meanB - meanA);
  var percentA = 1 - percentB;
  // calculate the portfolio risk
  var risk = (varianceA * math.pow(percentA, 2))
    + (2 * math.sqrt(varianceA) * math.sqrt(varianceB) * correlation
    * percentA * percentB)
    + (varianceB * math.pow(percentB, 2));
  risk = math.round(risk, 3);
  percentA = math.round(100*percentA, 1);
  percentB = math.round(100*percentB, 1);
  return [percentA, percentB, risk];
};

var stockReturn = function(stock) {
  var count = stock.actual.length;
  var diff = [];
  for (var i = 0; i < count - 1; i++) {
    diff[i] = stock.actual[count - 2 - i] - stock.actual[count - 1 - i];
    diff[i] = math.round(diff[i], 2);
  }
  return diff;
};

// export the individual modules
module.exports.expect = stockExpect;
module.exports.risk = stockRisk;
module.exports.correlate = stockCorrelation;
module.exports.strategize = stockStrategy;
module.exports.return = stockReturn;
