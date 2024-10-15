function getMaxElement(arr) {
  let max = Math.abs(arr[0]);
  for (let i = 0; i < arr.length; i++) {
    if (Math.abs(arr[i]) > max) {
      max = Math.abs(arr[i]);
    }
  }
  return max;
}

function countingSort(arr, exp) {
  const output = new Array(arr.length);
  const count = new Array(10).fill(0);

  for (let i = 0; i < arr.length; i++) {
    const digit = Math.floor(Math.abs(arr[i]) / exp) % 10;
    count[digit]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    const digit = Math.floor(Math.abs(arr[i]) / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
}

function radixSortHelper(arr) {
  const max = getMaxElement(arr);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSort(arr, exp);
  }
}

function radixSort(arr) {
  const negatives = arr.filter((num) => num < 0);
  const nonNegatives = arr.filter((num) => num >= 0);

  if (nonNegatives.length > 0) {
    radixSortHelper(nonNegatives);
  }

  if (negatives.length > 0) {
    radixSortHelper(negatives);
    negatives.reverse();
  }

  arr.splice(0, arr.length, ...negatives, ...nonNegatives);
}

const arr = [11, 65, 89, -33, -22, 43, 0, 2];
radixSort(arr);
console.log(arr);
