// ES5
var cache = new Map();

function simpleArithmetic(operator, ...args) {
  var opId = JSON.stringify({
    operator: operator,
    arguments:
      operator === "+" || operator === "*" ? [...args].sort() : [...args],
  });

  if (cache.has(opId)) {
    return cache.get(opId);
  }

  var result;

  switch (operator) {
    case "+":
      result = args.reduce((acc, curr) => acc + curr, 0);
      break;
    case "-":
      result = args.reduce((acc, curr) => acc - curr);
      break;
    case "*":
      result = args.reduce((acc, curr) => acc * curr, 1);
      break;
    case "/":
      result = args.reduce((acc, curr) => {
        if (curr === 0) {
          return "Error! Division by 0!";
        }
        return acc / curr;
      });
      break;
    default:
      result = "Error! Invalid operator!";
  }

  cache.set(opId, result);
  return result;
}

console.log(simpleArithmetic("+", 2, 3, 4, -1));
console.log(simpleArithmetic("-", 10, 1, 1, 4));
console.log(simpleArithmetic("+", -1, 3, 4, 2)); // already in cache
console.log(simpleArithmetic("-", 1, 1, 4, 10));
console.log(simpleArithmetic("*", 2, 3, 4));
console.log(simpleArithmetic("*", 4, 2, 3)); // already in cache
