/**
 * Returns the sum of the middle elements of the valid rows based on the rules.
 * @param {Array<string>} rules - An array of strings where each string represents a rule in the format "first|second".
 * @param {Array<Array<number>>} input - A 2D array of numbers where each sub-array represents a row of numbers.
 * @returns {number} The sum of the middle elements of the valid rows.
 *
 * The function `isValidRow` checks if a row is valid based on the rules. A row is considered valid if for each rule
 * "first|second", the number `first` appears before the number `second` in the row. If `first` or `second` is not
 * present in the row, the rule is ignored for that row.
 */
function part1(rules, input) {
  const ruleMap = new Map();
  rules.forEach((rule) => {
    const [first, second] = rule.split("|").map(Number);
    if (!ruleMap.has(first)) ruleMap.set(first, new Set());
    ruleMap.get(first).add(second);
  });

  function isValidRow(row) {
    const indexMap = new Map();
    row.forEach((num, index) => indexMap.set(num, index));
    for (let [first, seconds] of ruleMap.entries()) {
      if (indexMap.has(first)) {
        for (let second of seconds) {
          if (
            indexMap.has(second) &&
            indexMap.get(first) > indexMap.get(second)
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  let sum = 0;
  input.forEach((row) => {
    if (isValidRow(row)) {
      const middleIndex = Math.floor(row.length / 2);
      sum += row[middleIndex];
    }
  });
  return sum;
}

/**
 * Corrects the input rows based on the rules and returns the sum of the middle elements of the corrected rows.
 * @param {Array<string>} rules - An array of strings where each string represents a rule in the format "first|second".
 * @param {Array<Array<number>>} input - A 2D array where each sub-array represents a row of numbers to be corrected.
 * @returns {number} - The sum of the middle elements of the corrected rows.
 *
 * The function `part2` first creates a map of rules where each key is a number and the value is a set of numbers that must come after the key.
 * It then iterates over each row in the input and attempts to correct the row using the `correctRow` function.
 * If a row is corrected, the middle element of the corrected row is added to the sum.
 *
 * The `correctRow` function:
 * - Takes a row of numbers and attempts to correct it based on the rules.
 * - Creates an index map to keep track of the positions of each number in the row.
 * - Iterates over each rule and checks if the rule is violated in the row.
 * - If a rule is violated (i.e., a number appears before another number it should come after), it corrects the row by moving the number to the correct position.
 * - Updates the index map after each correction.
 * - Returns the corrected row if any corrections were made, otherwise returns null.
 */
function part2(rules, input) {
  const ruleMap = new Map();
  rules.forEach((rule) => {
    const [first, second] = rule.split("|").map(Number);
    if (!ruleMap.has(first)) ruleMap.set(first, new Set());
    ruleMap.get(first).add(second);
  });

  function correctRow(row) {
    const indexMap = new Map();
    row.forEach((num, index) => indexMap.set(num, index));
    let corrected = false;
    for (let [first, seconds] of ruleMap.entries()) {
      if (indexMap.has(first)) {
        for (let second of seconds) {
          if (
            indexMap.has(second) &&
            indexMap.get(first) > indexMap.get(second)
          ) {
            const firstIndex = indexMap.get(first);
            const secondIndex = indexMap.get(second);
            row.splice(secondIndex, 0, row.splice(firstIndex, 1)[0]);
            row.forEach((num, index) => indexMap.set(num, index));
            corrected = true;
          }
        }
      }
    }
    return corrected ? row : null;
  }

  let sum = 0;
  input.forEach((row) => {
    const correctedRow = correctRow(row);
    if (correctedRow) {
      const middleIndex = Math.floor(correctedRow.length / 2);
      sum += correctedRow[middleIndex];
    }
  });

  return sum;
}

module.exports = {
  part1,
  part2,
};
