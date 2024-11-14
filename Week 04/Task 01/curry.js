function curry(func) {
  var args = [];
  var argsCount = func.length;
  return function helper(...newArgs) {
    args = args.concat(newArgs);
    if (args.length >= argsCount) {
      try {
        // return func(...args); // ES6 way
        return func.apply(undefined, args); // ES5
      } finally {
        args = [];
      }
    }
    return helper;
  };
}

function tripleSum(a, b, c) {
  return a + b + c;
}

const currySum = curry(tripleSum);

const result1 = currySum(1)(2)(3);
const result2 = currySum(1, 2)(3);

console.log(result1);
console.log(result2);

const result3 = currySum(3)(5)(8);
const result4 = currySum(3)(5, 8);

console.log(result3);
console.log(result4);

const result11 = currySum(1, 2);
const result12 = currySum(3);

console.log(result11); // printing the function
console.log(result12);
