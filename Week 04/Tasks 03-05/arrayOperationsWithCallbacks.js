/* Task 03 */
function getSmallestElement(arr, compareFn) {
  return arr.slice().sort(compareFn).at(0);
}

const arr = [18, 30, 1, 8, 7, 4, 65, 5, 6];

// return the smallest even number, or the smallest odd if there are no even numbers
console.log(
  getSmallestElement(arr, (e1, e2) => {
    if (e1 % 2 === 0 && e2 % 2 !== 0) {
      return -1;
    }

    if (e1 % 2 !== 0 && e2 % 2 === 0) {
      return 1;
    }

    return e1 - e2;
  })
);

/* Task 04 */
function splitArrayByPredicate(arr, predicateFn) {
  const firstHalf = [];
  const secondHalf = [];

  for (const item of arr) {
    if (predicateFn(item)) {
      firstHalf.push(item);
    } else {
      secondHalf.push(item);
    }
  }

  return [firstHalf, secondHalf];
}

// return the split array into two parts (even part and odd part)
console.log(splitArrayByPredicate(arr, (el) => el % 2 == 0));

/* Task 05 */

function getUniqueElements(arr, compareFn) {
  const frequencyMap = new Map();
  arr.forEach((element) => {
    let found = false;

    for (const key of frequencyMap) {
      if (compareFn(item, key)) {
        frequencyMap.set(key, frequencyMap.get(key) + 1);
      }
      found = true;
      break;
    }

    if (!found) {
      frequencyMap.set(item, 1);
    }
  });

  return arr.filter((el) => frequencyMap.get(el) === 1);
}
