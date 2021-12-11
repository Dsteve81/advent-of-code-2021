import run from "aocrunner";
import "array-linq";

const parseInput = (rawInput: string): Array<any> => rawInput.split('\n').select((c) => Array.from(c.trim()).select((c) => new element({value: +c})));

class element {
  value: number;
  key?: number;
  neighbours: Array<element>;
  flashCount: number;

  constructor(init: Partial<element>) {
    this.value = init.value as number;
    this.neighbours = [];
    this.flashCount = 0;
  }

  process = (): void => {
    if(this.value < 10) {
      this.value++;

      if(this.value === 10) {
        this.flashCount++;
        for(let i: number = 0; i < this.neighbours.length; i++) {
          this.neighbours[i].process();
        }
      }
    } 
  }
}

const createLinkedList = (input: Array<Array<element>>): Array<element> => {
  const result: Array<element> = [];
  let key: number = 0;
  for(let i: number = 0; i < input.length; i++) {
    for(let j: number = 0; j < input[i].length; j++) {
      const item: element = input[i][j];
      item.key = key;

      if(j > 0) {
        item.neighbours.push(input[i][j-1]);
      }

      if(j < input[i].length - 1) {
        item.neighbours.push(input[i][j+1]);
      }

      if(i > 0) {
        item.neighbours.push(input[i-1][j]);
      }

      if(i < input.length - 1) {
        item.neighbours.push(input[i+1][j]);
      }

      if(j > 0 && i > 0) {
        item.neighbours.push(input[i-1][j-1]);
      }

      if(i > 0 && j < input[i].length - 1) {
        item.neighbours.push(input[i-1][j+1]);
      }

      if(i < input.length - 1 && j > 0) {
        item.neighbours.push(input[i+1][j-1])
      }

      if(i < input.length - 1 && j < input[i].length - 1) {
        item.neighbours.push(input[i+1][j+1]);
      }

      result.push(item);
      key++;
    }
  }

  return result;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const list = createLinkedList(input);

  for(let i: number = 0; i < 100; i++) {
    for(let j: number = 0; j < list.length; j++) {
      list[j].process();
    }

    for(let j: number = 0; j < list.length; j++) {
      if(list[j].value === 10) {
        list[j].value = 0; 
      }
    }
  }

  return list.select((c) => c.flashCount).sum();
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);const list = createLinkedList(input);
  let counter: number = 0;

  while(true) {
    for(let j: number = 0; j < list.length; j++) {
      list[j].process();
    }

    for(let j: number = 0; j < list.length; j++) {
      if(list[j].value === 10) {
        list[j].value = 0; 
      }
    }

    counter++;
    
    if(list.select((c) => c.value).sum() === 0 || counter > 200000) {
      break;
    }
  }
  
  return counter;
}

run({
  part1: {
    tests: [
      { 
        input: `5483143223
                2745854711
                5264556173
                6141336146
                6357385478
                4167524645
                2176841721
                6882881134
                4846848554
                5283751526`, 
        expected: 1656
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { 
        input: `5483143223
                2745854711
                5264556173
                6141336146
                6357385478
                4167524645
                2176841721
                6882881134
                4846848554
                5283751526`, 
        expected: 195
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false
});
