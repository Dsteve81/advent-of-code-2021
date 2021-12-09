import run from "aocrunner";
import "array-linq";

const parseInput = (rawInput: string): Array<string> => rawInput.split('\n').select((c) => c.trim());

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  let horizontal: number = 0;
  let depth: number = 0;

  for(let i: number = 0; i < rows.length; i++) {
    const command: string = rows[i].split(' ')[0].trim();
    const value: number = +rows[i].split(' ')[1].trim();

    if (command === "down") {
        depth = depth + value;
    }
    else if (command === "up") {
        depth = depth - value;
    }
    else {
        horizontal = horizontal + value;
    }
  }
  
  return horizontal * depth;
}

const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  let horizontal: number = 0;
  let depth: number = 0;
  let aim: number = 0;

  for(let i: number = 0; i < rows.length; i++) {
    const command: string = rows[i].split(' ')[0].trim();
    const value: number = +rows[i].split(' ')[1].trim();

    if (command === "down") {
      aim = aim + value;
    }
    else if (command === "up") {
      aim = aim - value;
    }
    else {
      horizontal = horizontal + value;
      depth = depth + (aim * value);
    }
  }
  
  return horizontal * depth;
}

run({
  part1: {
    tests: [
       { 
        input: `forward 5
                down 5
                forward 8
                up 3
                down 8
                forward 2`,
          expected: 150,
        },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { 
        input: `forward 5
                down 5
                forward 8
                up 3
                down 8
                forward 2`,
        expected: 900, 
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
