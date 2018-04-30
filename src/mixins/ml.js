export default {
  methods: {
    softmax: function (arr, temp=1.0) {
      try {
        return arr.map(function (value, index) {
          return Math.exp(value / temp) / arr.map(function (y) {
            return Math.exp(y / temp)
          }).reduce(function (a, b) {
            return a + b
          })
        })
      }
      catch (err) {
        return arr;
      }
    },
    mean: function (arr) {
      let sum = arr.reduce(function (sum, value) {
        return sum + value;
      }, 0);
      return sum / arr.length;
    },
    std: function (arr) {
      let avg = this.mean(arr);

      let squareDiffs = arr.map(function (value) {
        let diff = value - avg;
        return diff * diff;
      });

      let avgSquareDiff = this.mean(squareDiffs);

      return Math.sqrt(avgSquareDiff);
    }

  }
}
