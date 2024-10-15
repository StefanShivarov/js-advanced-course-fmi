function handleMultiplications(elements) {
  let opIndex, result;
  while ((opIndex = elements.indexOf("*")) !== -1) {
    result =
      parseFloat(elements[opIndex - 1]) * parseFloat(elements[opIndex + 1]);
    elements.splice(opIndex - 1, 3, result);
  }
}

function handleDivision(elements) {
  let opIndex, result;
  while ((opIndex = elements.indexOf("/")) !== -1) {
    result =
      parseFloat(elements[opIndex - 1]) / parseFloat(elements[opIndex + 1]);

    elements.splice(opIndex - 1, 3, result);
  }
}

function handleAddition(elements) {
  let opIndex, result;
  while ((opIndex = elements.indexOf("+")) !== -1) {
    result =
      parseFloat(elements[opIndex - 1]) + parseFloat(elements[opIndex + 1]);

    elements.splice(opIndex - 1, 3, result);
  }
}

function handleSubtraction(elements) {
  let opIndex, result;
  while ((opIndex = elements.indexOf("-")) !== -1) {
    result =
      parseFloat(elements[opIndex - 1]) - parseFloat(elements[opIndex + 1]);

    elements.splice(opIndex - 1, 3, result);
  }
}

function evaluateExpression(expr) {
  let elements = expr.split(" ");

  handleMultiplications(elements);
  handleDivision(elements);
  handleAddition(elements);
  handleSubtraction(elements);

  return parseFloat(elements[0]);
}

function longestConsecutiveEqualNumbers(arr) {
  if (arr.length === 0) {
    return 0;
  }

  let maxCount = 1;
  let currentCount = 1;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) {
      currentCount++;
    } else {
      maxCount = Math.max(currentCount, maxCount);
      currentCount = 1;
    }
  }
  maxCount = Math.max(currentCount, maxCount);
  return maxCount;
}

function validateEquations(equations) {
  let expressions = equations.split(" = ");
  let results = [];

  for (let i = 0; i < expressions.length; i++) {
    results[i] = evaluateExpression(expressions[i]);
  }

  console.log(
    equations,
    "=>",
    longestConsecutiveEqualNumbers(results) - 1,
    "/",
    expressions.length - 1
  );
}

validateEquations("1 + 11 = 12 = 6 * 2 = 24 / 2 = 11.5");
validateEquations("3 + 2 = 5");
validateEquations("7 - 3 * 2 + 1 = 4 * 2 + 1 = 8 + 1 = 9");
