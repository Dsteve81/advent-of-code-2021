import run from "aocrunner";
import "array-linq";

const parseInput = (rawInput: string): Array<any> => rawInput.split('\n').select((c) => c.trim());

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return
}

run({
  part1: {
    tests: [
      // { 
      //   input: ``, 
      //   expected: 0
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { 
      //   input: ``, 
      //   expected: 0
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true
});
