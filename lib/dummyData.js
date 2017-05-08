// Stores and serves dummy data for 2 stocks
var dummyDataStore = {
  // nothing/noone outside this module should ever manipulate _stockA or _stockB
  _stockA: [2, 1, 3, 2],
  _stockB: [3, 7, -6, 4],

  // functions
  fetch: function(stock, index) {
    // returns the data point at the specified index of the specified stock
    if (stock == 'A') {
      return this._stockA[index];
    } else if (stock == 'B') {
      return this._stockB[index];
    } else {
      return NaN;
    }
  },

  expectation: function(stock) {
    if (stock == 'A') {
      var count = this._stockA.length;
      var sum = 0;
      for (var i = 0; i < count; i++) {
        sum += this._stockA[i];
      }
      var meanVal = sum/count;
      return meanVal;
    } else if (stock == 'B') {
      var count = this._stockB.length;
      var sum = 0;
      for (var i = 0; i < count; i++) {
        sum += this._stockB[i];
      }
      var meanVal = sum/count;
      return meanVal;
    } else {
      return NaN;
    }
  }

  // functions
  /*
  addGrade: function(newGrade){
    this._grades.push(newGrade);
  },
  getCountOfGrades: function(){
    return this._grades.length;
  },
  getAverage: function(){
    var count = this._grades.length;
    var total = 0;
    for (var i = 0; i < count; i++){
      total += this._grades[i];
    }
    var average = total / count;
    return average;
  },

  // rest function is super important!
  reset: function(){
    this._grades = [];
  },

  // letter grades A(90 to 100) B(80 to <90) C(70 to <80) D(60 to <70) F (<60)
  getLetterGrade: function(){
    var average = this.getAverage();
    var letterGrade = '';
    if (average >= 90) {
      letterGrade = 'A';
    } else if (average >= 80) {
      letterGrade = 'B';
    } else if (average >= 70) {
      letterGrade = 'C';
    } else if (average >= 60) {
      letterGrade = 'D';
    } else {
      letterGrade = 'F';
    }
    return letterGrade;
  }
*/
}

exports.data = dummyDataStore;
