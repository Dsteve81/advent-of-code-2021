import run from "aocrunner";
import "array-linq";

const parseInput = (rawInput: string): Array<number> => rawInput.split(',').select((c) => +c.trim());

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const results: Array<any> = [];

  for(let i: number = 0; i <= input.max(); i++) {
    results.push({
      nr: i,
      value: input.select((c) => Math.abs(c - i)).sum()
    })
  } 

  // console.table(results);

  return results.orderBy((c) => c.value).first().value;  
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const results: Array<any> = [];
  const help: Array<number> = [];

  for(let i: number = 0; i <= input.max(); i++) {
    let nr: number = 0;
    for(let j: number = 0; j <= i; j++) {
      nr += j;
    }
    help[i] = nr;
  }

  var he: any = input.select((c) => help[Math.abs(c - 5)]);
  

  for(let i: number = 0; i < input.max(); i++) {
    results.push({
      nr: i,
      value: input.select((c) => help[Math.abs(c - i)]).sum()
    })
  } 

  return results.orderBy((c) => c.value).first().value;
}

run({
  part1: {
    tests: [
      { input: `16,1,2,0,4,2,7,1,2,14`, expected: 37 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `16,1,2,0,4,2,7,1,2,14`, expected: 168 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false
});
