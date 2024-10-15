function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
    }
  }

  swap(arr, i + 1, right);
  return i + 1;
}

function swap(arr, first, second) {
  [arr[first], arr[second]] = [arr[second], arr[first]];
}

function quickSort(arr, left, right) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);

    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
}

const arr = [12, 59, -21, 7, 4, 31, 2];
quickSort(arr, 0, arr.length - 1);
console.log(arr);
