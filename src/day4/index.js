const fs = require("fs");
const path = require("path");
const { part1Solution, part2Solution } = require("./solutions");

const puzzleInput = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .trim();

const sampleInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

console.log(part1Solution(sampleInput));
console.log(part1Solution(puzzleInput));

console.log(part2Solution(sampleInput));
console.log(part2Solution(puzzleInput));
