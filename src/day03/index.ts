import run from "aocrunner";
import "array-linq";

const parseInput = (rawInput: string): Array<string> => rawInput.split('\n').select((c) => c.trim());

const part1 = (rawInput: string) => {
  const input: Array<string> = parseInput(rawInput);
  const rows: Array<Array<string>> = input.select((c) => Array.from(c));
  let value1: string = "";
  let value2: string = "";

  for(let i: number = 0; i < rows[0].length; i++) {
    const up: number = rows.select((c) => +c[i]).sum();
    value1 += up >= rows.length - up ? "1" : "0";
    value2 += up < rows.length - up ? "1" : "0";
  }

  const nr1: number = parseInt(value1, 2);
  const nr2: number = parseInt(value2, 2);

  return nr1 * nr2;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rows: Array<Array<string>> = input.select((c) => Array.from(c));
  let oxygen: number;
  let co2: number;
  
  let temp: Array<Array<string>> = rows;
  let pos: number = 0;
  
  while(temp.length > 1) {    
    const up: number = temp.select((c) => +c[pos]).sum();

    if(up >= temp.length - up) {
      temp = temp.where((c) => c[pos] === "1");
    } else {
      temp = temp.where((c) => c[pos] === "0");
    }

    pos++;
  }
  
  oxygen = parseInt(temp[0].join(""),2);

  temp = rows;
  pos = 0;

  while(temp.length > 1) {    
    const up: number = temp.select((c) => +c[pos]).sum();

    if(up >= temp.length - up) {
      temp = temp.where((c) => c[pos] === "0");
    } else {
      temp = temp.where((c) => c[pos] === "1");
    }

    pos++;
  }

  co2 = parseInt(temp[0].join(""),2);

  return oxygen * co2;
}

run({
  part1: {
    tests: [
      { 
        input: `00100
                11110
                10110
                10111
                10101
                01111
                00111
                11100
                10000
                11001
                00010
                01010`, 
        expected: 198 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { 
        input: `00100
                11110
                10110
                10111
                10101
                01111
                00111
                11100
                10000
                11001
                00010
                01010`, 
        expected: 230 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});