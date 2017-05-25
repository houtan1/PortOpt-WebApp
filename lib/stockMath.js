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
  return sum/count;
};

var stockRisk = function(stock) {
  var count = stock.monthly.length;
  var mean = stockExpect(stock);
  var difsOfMean = 0;
  for (var i = 0; i < count; i++) {
    difsOfMean += math.pow((stock.monthly[i] - mean), 2);
  }
  return difsOfMean/count;
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

// MUST CHECK IF CORRELATION IS NEGATIVE!!!
// MUST CHECK IF DESIRED RETURN IS BETWEEN THE EXPECTATIONS (INCLUSIVE)
var stockStrategy = function(stockA, stockB, goal) {
  var countA = stockA.monthly.length;
  var countB = stockB.monthly.length;
  if (countA != countB) return false;
  var meanA = stockExpect(stockA);
  var meanB = stockExpect(stockB);
  if ((goal < meanA && goal < meanB) || (goal > meanA && goal > meanB))
    return false;
  var varianceA = stockRisk(stockA);
  var varianceB = stockRisk(stockB);
  var correlation = stockCorrelation(stockA, stockB);
  if (correlation > 0) return false;
  var percentB = (goal - meanA)/(meanB - meanA);
  var percentA = 1 - percentB;
  var risk = (varianceA * math.pow(percentA, 2))
    + (2 * math.sqrt(varianceA) * math.sqrt(varianceB) * correlation
    * percentA * percentB)
    + (varianceB * math.pow(percentB, 2));
  risk = math.round(risk, 3);
  return [percentA, percentB, risk];
}

// export the individual modules
module.exports.expect = stockExpect;
module.exports.risk = stockRisk;
module.exports.correlate = stockCorrelation;
module.exports.strategize = stockStrategy;
