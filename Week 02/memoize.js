// ES5
function memoize(func) {
  var cache = {};
  return function () {
    var key = JSON.stringify(arguments);
    var result = cache[key];
    if (!result) {
      result = func.apply({}, arguments);
      cache[key] = result;
    }
    return result;
  };
}

const sum = function (a, b) {
  return a + b;
};

const memoizedSum = memoize(sum);

console.log(memoizedSum(2, 3));
console.log(memoizedSum(1, 9));
console.log(memoizedSum(2, 3)); // already in cache
