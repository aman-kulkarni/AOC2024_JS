const fs = require("fs");
const path = require("path");

const inputFilePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputFilePath, "utf-8");

function getSumOfMul(input) {
  let sum = 0;
  const regex = /mul\((\d{1,3}),(\d{1,3})\)|mul\[(\d{1,3}),(\d{1,3})\]/;
  let match;
  let enabled = true;

  const instructions = input.split(/(?=mul\()|(?=do\(\))|(?=don't\(\))/);

  for (const instruction of instructions) {
    if (instruction.startsWith("do()")) {
      enabled = true;
    } else if (instruction.startsWith("don't()")) {
      enabled = false;
    } else if (enabled && (match = instruction.match(regex)) !== null) {
      const a = parseInt(match[1] || match[3], 10);
      const b = parseInt(match[2] || match[4], 10);
      sum += a * b;
    }
  }

  return sum;
}

const exampleInput1 =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

const exampleInput2 =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

console.log(getSumOfMul(exampleInput1));
console.log(getSumOfMul(exampleInput2));
console.log(getSumOfMul(input));
