import run from "aocrunner";
import "array-linq";

class element {
  value: string;
  connections: Array<element>;
  isLower: boolean;
  lowerValues: any;

  constructor(init: Partial<element>) {
    this.value = init.value as string;
    this.isLower = init.isLower as boolean;
    this.connections = [];
    this.lowerValues = {};
  }

  routes = (results: Array<Array<element>> = [], lowerAlloLimit: number = 1, steps: Array<element> = []): void => {
    const mySteps: Array<element> = [...steps];
    mySteps.push(this);
   
    const lowerValues: any = {};
    let actualDoubleCount: number = 0;

    Object.entries(this.lowerValues).forEach(
      ([key, value]) => {
        lowerValues[key] = mySteps.where((c) => c.value === key).count();
        if(lowerValues[key] === 2) {
          actualDoubleCount++;
        }
      }
    );

    for(let i: number = 0; i < this.connections.length; i++) {
      const next: element = this.connections[i];

      if(next.value === "end" && actualDoubleCount < 2) {
        mySteps.push(next);
        results.push(mySteps);
      } else if(actualDoubleCount < 2 && next.value !== "start" && (!next.isLower || lowerValues[next.value] < lowerAlloLimit)) {
        next.routes(results, lowerAlloLimit, mySteps);
      } 
    }
  }
}

const parseInput = (rawInput: string): Array<any> => rawInput.split('\n').select((c) => c.split('-').select((c) => c.trim()));

const prepareElements = (rows: Array<Array<string>>) => {
  const elements: Array<element> = [];

  for(let i: number = 0; i < rows.length; i++) {
    for(let j: number = 0; j < rows[i].length; j++) {
      if(!elements.any((c) => c.value === rows[i][j])) {
        elements.push(new element({
          value: rows[i][j],
          isLower: rows[i][j] === rows[i][j].toLowerCase() && rows[i][j] !== "start" && rows[i][j] !== "end"
        }));
      }
    }
  }

  const lowerValues = elements.where((c) => c.isLower).select((c) => c.value);

  for(let i: number = 0; i < elements.length; i++) {
    for(let j: number = 0; j < rows.length; j++) {
      if(rows[j].contains(elements[i].value)) {
        const pairValue: string = rows[j].where((c) => c !== elements[i].value)[0];
        if(!elements[i].connections.any((c) => c.value === pairValue)) {
          elements[i].connections.push(elements.single((c) => c.value === pairValue));
        }
      }
    }

    for(let j: number = 0; j < lowerValues.length; j++) {
      elements[i].lowerValues[lowerValues[j]] = 0;
    }
  }  

  return elements.single((c) => c.value === "start");
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const results: Array<Array<element>> = [];
  const startElement = prepareElements(input); 
  startElement.routes(results);

  return results.length;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const results: Array<Array<element>> = [];
  const startElement = prepareElements(input); 
  startElement.routes(results, 2);

  return results.length;
}

run({
  part1: {
    tests: [
      { 
        input: `start-A
                start-b
                A-c
                A-b
                b-d
                A-end
                b-end`, 
        expected: 10
      },
      { 
        input: `dc-end
                HN-start
                start-kj
                dc-start
                dc-HN
                LN-dc
                HN-end
                kj-sa
                kj-HN
                kj-dc`, 
        expected: 19
      },
      { 
        input: `fs-end
                he-DX
                fs-he
                start-DX
                pj-DX
                end-zg
                zg-sl
                zg-pj
                pj-he
                RW-he
                fs-DX
                pj-RW
                zg-RW
                start-pj
                he-WI
                zg-he
                pj-fs
                start-RW`, 
        expected: 226
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { 
        input: `start-A
                start-b
                A-c
                A-b
                b-d
                A-end
                b-end`, 
        expected: 36
      },
      { 
        input: `dc-end
                HN-start
                start-kj
                dc-start
                dc-HN
                LN-dc
                HN-end
                kj-sa
                kj-HN
                kj-dc`, 
        expected: 103
      },
      { 
        input: `fs-end
                he-DX
                fs-he
                start-DX
                pj-DX
                end-zg
                zg-sl
                zg-pj
                pj-he
                RW-he
                fs-DX
                pj-RW
                zg-RW
                start-pj
                he-WI
                zg-he
                pj-fs
                start-RW`, 
        expected: 3509
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false
});
