function multiplyMatrices(matrixA, matrixB) {
  if (matrixA[0].length !== matrixB.length) {
    console.error(
      "Number of columns in matrix A must be equal to number of rows in matrix B."
    );
  }

  let result = [];

  for (let i = 0; i < matrixA.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrixB[0].length; j++) {
      result[i][j] = 0;
      for (let k = 0; k < matrixA[0].length; k++) {
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }

  return result;
}

let matrixA = [
  [1, 2, 3],
  [4, 5, 6],
];

let matrixB = [
  [7, 8],
  [9, 10],
  [11, 12],
];

console.log(multiplyMatrices(matrixA, matrixB));
