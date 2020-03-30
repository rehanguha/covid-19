function normalize(list) {
    var minMax = list.reduce((acc, value) => {
       if (value < acc.min) {
          acc.min = value;
       }
 
       if (value > acc.max) {
          acc.max = value;
       }
 
       return acc;
    }, {min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY});
 
    return list.map(value => {
       // Verify that you're not about to divide by zero
       if (minMax.max === minMax.min) {
          return 1 / list.length
       }
 
       var diff = minMax.max - minMax.min;
       return (value - minMax.min) / diff;
    });
 }