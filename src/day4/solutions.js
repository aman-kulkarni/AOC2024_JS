/**
 * Counts the occurrences of a given word in a 2D grid. The word can be placed
 * vertically, horizontally, diagonally, and even in reverse.
 *
 * @param {string[][]} grid - A 2D array of characters representing the grid.
 * @param {string} word - The word to search for in the grid.
 * @returns {number} The total number of occurrences of the word in the grid.
 *
 * The function works by iterating through each cell in the grid and checking
 * all 8 possible directions (right, down, down-right, down-left, left, up,
 * up-left, up-right) for the presence of the word. If the word is found in any
 * direction starting from a cell, the count is incremented.
 */
const countOccurrences = (grid, word) => {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
    [0, -1],
    [-1, 0],
    [-1, -1],
    [-1, 1],
  ];
  const numRows = grid.length;
  const numCols = grid[0].length;
  const wordLength = word.length;
  let count = 0;

  const isValid = (x, y) => x >= 0 && y >= 0 && x < numRows && y < numCols;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      for (let [dx, dy] of directions) {
        let k,
          newRow = row,
          newCol = col;
        for (k = 0; k < wordLength; k++) {
          if (!isValid(newRow, newCol) || grid[newRow][newCol] !== word[k])
            break;
          newRow += dx;
          newCol += dy;
        }
        if (k === wordLength) count++;
      }
    }
  }
  return count;
};

/**
 * Counts the occurrences of specific diagonal patterns around the letter 'A' in a given grid.
 *
 * The function checks for the following patterns around each 'A':
 * - ["M", "M", "S", "S"]
 * - ["S", "S", "M", "M"]
 * - ["M", "S", "M", "S"]
 * - ["S", "M", "S", "M"]
 *
 * The patterns are checked in the following positions relative to 'A':
 * - Top-left
 * - Top-right
 * - Bottom-left
 * - Bottom-right
 *
 * @param {string[][]} grid - A 2D array representing the grid of characters.
 * @returns {number} The count of diagonal patterns found around 'A'.
 */
const countDiagonalMASOccurrences = (grid) => {
  let count = 0;
  const numRows = grid.length;
  const numCols = grid[0].length;
  const patterns = [
    ["M", "M", "S", "S"],
    ["S", "S", "M", "M"],
    ["M", "S", "M", "S"],
    ["S", "M", "S", "M"],
  ];

  for (let row = 1; row < numRows - 1; row++) {
    for (let col = 1; col < numCols - 1; col++) {
      if (grid[row][col] === "A") {
        for (let pattern of patterns) {
          if (
            grid[row - 1][col - 1] === pattern[0] &&
            grid[row - 1][col + 1] === pattern[1] &&
            grid[row + 1][col - 1] === pattern[2] &&
            grid[row + 1][col + 1] === pattern[3]
          ) {
            count++;
            break;
          }
        }
      }
    }
  }

  return count;
};

const part1Solution = (input) => {
  const grid = input.split("\n").map((line) => line.split(""));
  return countOccurrences(grid, "XMAS");
};

const part2Solution = (input) => {
  const grid = input.split("\n").map((line) => line.split(""));
  return countDiagonalMASOccurrences(grid);
};

module.exports = {
  part1Solution,
  part2Solution,
};
