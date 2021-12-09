import run from "aocrunner";
import "array-linq";

class element {
  value: number;
  key?: number;
  up?: element;
  down?: element;
  left?: element;
  right?: element;
  basinKeyValues?: Array<number>;

  constructor(init: Partial<element>) {
    this.value = init.value as number;
  }

  isLowPoint = (): boolean => {
    if((this.up === undefined || this.up.value > this.value) &&
       (this.down === undefined || this.down.value > this.value) &&
       (this.left === undefined || this.left.value > this.value) &&
       (this.right === undefined || this.right.value > this.value)) {
        return true;
       }

    return false;
  }

  isSingleLowPoint = (): boolean => {
    return false;
  }

  basinKeys = (): Array<number> => {
    if (this.value !== 9) {
      let result: Array<number> = [this.key as number];
      if(this.up !== undefined && this.up.value > this.value && this.up.value !== 9) {
        for(const key of this.up.basinKeys()) {
          result.push(key);
        }
      }
      if(this.down !== undefined && this.down.value > this.value  && this.down.value !== 9) {
        for(const key of this.down.basinKeys()) {
          result.push(key);
        }
      }
      if(this.left !== undefined && this.left.value > this.value && this.left.value !== 9) {
        for(const key of this.left.basinKeys()) {
          result.push(key);
        }
      }
      if(this.right !== undefined && this.right.value > this.value && this.right.value !== 9) {
        for(const key of this.right.basinKeys()) {
          result.push(key);
        }
      }
      return result;
    }
    return [];
  }
}

const parseInput = (rawInput: string): Array<any> => rawInput.split('\n').select((c) => Array.from(c.trim()).select((c) => new element({value: +c})));

const createLinkedList = (input: Array<Array<element>>): Array<element> => {
  const result: Array<element> = [];
  let key: number = 0;
  for(let i: number = 0; i < input.length; i++) {
    for(let j: number = 0; j < input[i].length; j++) {
      const item: element = input[i][j];
      item.key = key;

      if(j > 0) {
        item.left = input[i][j-1];
      }

      if(j < input[i].length - 1) {
        item.right = input[i][j+1];
      }

      if(i > 0) {
        item.up = input[i-1][j];
      }

      if(i < input.length - 1) {
        item.down = input[i+1][j];
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

  const relevantItems = list.where((c) => c.isLowPoint());
  const result = relevantItems.select((c) => c.value + 1).sum();

  return result;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const list = createLinkedList(input);
  const relevantKeys: Array<number> = [];
  const values: Array<number> = [];

  const lowPoints = list.where((c) => c.isLowPoint());

  for(let i: number = 0; i < 3; i++) {
    for(let item of lowPoints) {
      item.basinKeyValues = item.basinKeys().distinct();
    }
    const basin = lowPoints.where((c) => !relevantKeys.includes(c.key as number)).orderByDescending((c) => c.basinKeyValues?.length)[0];
    relevantKeys.push(basin.key as number);
    values.push(basin.basinKeyValues?.length as number);
  }

  return values[0] * values[1] *  values[2];
}

run({
  part1: {
    tests: [
      { 
        input: `2199943210
                3987894921
                9856789892
                8767896789
                9899965678`, 
        expected: 15 
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { 
        input: `2199943210
                3987894921
                9856789892
                8767896789
                9899965678`, 
        expected: 1134 
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false
});
