import run from "aocrunner";
import "array-linq";

const parseInput = (rawInput: string): Array<number> => rawInput.split(',').select((c) => +c.trim());

const iterationCount = (daysLeft: number, init: number): number => {
  let replication: number = Math.ceil((daysLeft - init) / 7);

  let j: number = 1;
  for(let i: number = daysLeft - init; i > 0; i -= 6) {
    replication += iterationCount(i - j, 8);
    j++;
  }

  return Math.max(0, replication);
};

const part1NrResult: Array<number> = [];
const part2NrResult: Array<number> = [];

const part1 = (rawInput: string) => {
  const input: Array<number> = parseInput(rawInput);
  let result: number = 0;

  if(part1NrResult.length === 0) {
    for(let i: number = 0; i < 7; i++) {
      part1NrResult.push(iterationCount(80, i) + 1);
    }
  }

  for(let i: number = 0; i < input.length; i++) {
    result+= part1NrResult[input[i]];
  }

  return result;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let result: number = 0;

  if(part2NrResult.length === 0) {
    for(let i: number = 0; i < 7; i++) {
      console.log(i);
      part2NrResult.push(iterationCount(256, i) + 1);
    }
  }

  for(let i: number = 0; i < input.length; i++) {
    result+= part2NrResult[input[i]];
  }

  return result;
}

run({
  part1: {
    tests: [
      { input: `3,4,3,1,2`, expected: 5934 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `3,4,3,1,2`, expected: 26984457539 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
