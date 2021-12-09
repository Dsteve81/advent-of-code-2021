import run from "aocrunner";
import "array-linq";

const parseInput = (rawInput: string): number[] => rawInput.split('\n').map(Number);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let counter = 0;

  for (let i: number = 0; i < input.length - 1; i++)
  {
      if (input[i + 1] > input[i])
      {
          counter++;
      }
  }

  return counter;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let counter: number = 0;

  for (let i: number = 0; i < input.length - 1; i++)
  {
      let sumA: number = 0;
      let sumB: number = 0;

      for (let j: number = i; j < i + 3; j++)
      {
          sumA += input[j];
      }

      for (let j: number = i + 1; j < i + 4; j++)
      {
          sumB += input[j];
      }

      if (sumB > sumA)
      {
          counter++;
      }
  }

  return counter;
}

run({
  part1: {
    tests: [
      {
          input: `199
                  200
                  208
                  210
                  200
                  207
                  240
                  269
                  260
                  263`,
          expected: 7,
      },
  ],
    solution: part1,
  },
  part2: {
    tests: [
      {
          input: `199
                  200
                  208
                  210
                  200
                  207
                  240
                  269
                  260
                  263`,
          expected: 5,
      },
  ],
    solution: part2,
  },
  trimTestInputs: true,
})
