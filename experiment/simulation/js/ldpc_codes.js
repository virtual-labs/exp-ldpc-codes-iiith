//Your JavaScript goes in here

function generateParityCheckMatrix(rate, n) {
  const k = Math.floor(rate * n);
  const rows = n - k;
  const cols = n;

  const maxOnesPerRow = Math.floor(cols / 4);

  let H = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i++) {
    let onesPositions = new Set();
    while (onesPositions.size < maxOnesPerRow) {
      let randCol = Math.floor(Math.random() * cols);
      onesPositions.add(randCol);
    }

    for (let pos of onesPositions) {
      H[i][pos] = 1;
    }
  }

  // ensure that each column has at least one 1

  for (let j = 0; j < cols; j++) {
    let ones = H.map((row) => row[j]);
    if (!ones.includes(1)) {
      let randRow = Math.floor(Math.random() * rows);
      H[randRow][j] = 1;
    }
  }

  return H;
}

// Example 
const rate = 0.5;
const blockLength = 8;
let parityCheckMatrix = generateParityCheckMatrix(rate, blockLength);

console.table(parityCheckMatrix);
