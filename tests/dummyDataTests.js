var dummyData = require("../lib/dummyData").data;

// tests
exports["Can fetch data from stock A"] = function (test) {

  // return the data point at index 2 of stock A
  var value = dummyData.fetch('A', 2);

  // check to see if the right value was returned. Assertion.
  test.equal(value, 3);

  // end of test.
  test.done();
};

exports["Can fetch data from stock B"] = function (test) {

  // return the data point at index 2 of stock B, a negative value!
  var value = dummyData.fetch('B', 2);

  // check to see if the right value was returned. Assertion.
  test.equal(value, -6);

  // end of test.
  test.done();
};

exports["Calculate expectation of stock A"] = function (test) {

  // return the mean (expectation value) of stock A
  var mean = dummyData.expectation('A');

  // Assertion (2+1+3+2)/(4)=2
  test.equal(mean, 2);

  //end of test
  test.done();
};

exports["Calculate expectation of stock B"] = function (test) {

  // return the mean (expectation value) of stock B
  var mean = dummyData.expectation('B');

  // Assertion (3+7-6+4)/(4)=2
  test.equal(mean, 2);

  //end of test
  test.done();
};
