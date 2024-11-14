function compose(...funcs) {
  return function composedFunc(...args) {
    const initialValue = funcs.pop().apply(undefined, args);
    // return funcs.reduceRight((acc, curr) => curr(acc), initialValue);
    return funcs.reduceRight((acc, curr) => {
      return curr.apply(undefined, [acc]);
    }, initialValue);
  };
}

function sum(a, b) {
  return a + b;
}
function multiplyBy3(a) {
  return a * 3;
}

const addMultiply = compose(multiplyBy3, sum); // multiplyBy3(sum(...))
console.log(addMultiply(10, 29)); // 3 * (10 + 29) = 117
