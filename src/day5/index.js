const fs = require("fs");
const path = require("path");
const { part1, part2 } = require("./solutions");

const rulesPath = path.join(__dirname, "rules.txt");
const inputPath = path.join(__dirname, "input.txt");

const exampleRules = [
  "47|53",
  "97|13",
  "97|61",
  "97|47",
  "75|29",
  "61|13",
  "75|53",
  "29|13",
  "97|29",
  "53|29",
  "61|53",
  "97|53",
  "61|29",
  "47|13",
  "75|47",
  "97|75",
  "47|61",
  "75|61",
  "47|29",
  "75|13",
  "53|13",
];

const exampleData = [
  [75, 47, 61, 53, 29],
  [97, 61, 53, 29, 13],
  [75, 29, 13],
  [75, 97, 47, 61, 53],
  [61, 13, 29],
  [97, 13, 75, 29, 47],
];

const rules = fs.readFileSync(rulesPath, "utf-8").split("\n").filter(Boolean);
const input = fs
  .readFileSync(inputPath, "utf-8")
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split(",").map(Number));

console.log(part1(exampleRules, exampleData));
console.log(part1(rules, input));

console.log(part2(exampleRules, exampleData));
console.log(part2(rules, input));
