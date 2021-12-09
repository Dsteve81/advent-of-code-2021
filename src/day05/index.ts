import run from "aocrunner";
import "array-linq";

class Line {
  pointA: Point;
  pointB: Point;

  constructor(init: Partial<Line>) {
    this.pointA = init.pointA as Point;
    this.pointB = init.pointB as Point;
  }
}

class Point {
  x: number;
  y: number;

  constructor(init: Partial<Point>) {
    this.x = init.x as number;
    this.y = init.y as number;
  }
}

const parseInput = (rawInput: string): Array<Line> => rawInput.split('\n').select((c) =>  new Line({ 
  pointA: new Point({ x: +c.trim().split(" -> ")[0].split(',')[0], y: +c.trim().split(" -> ")[0].split(',')[1] }),
  pointB: new Point({ x: +c.trim().split(" -> ")[1].split(',')[0], y: +c.trim().split(" -> ")[1].split(',')[1] })
}));

const createMatrix = (lines: Array<Line>) => {
  const maxX: number = Math.max(lines.select((c) => c.pointA.x).max(), lines.select((c) =>c.pointB.x).max());
  const maxY: number = Math.max(lines.select((c) => c.pointA.y).max(), lines.select((c) =>c.pointB.y).max());
  const matrix: number[][] = [];

  for(let i: number = 0; i <= maxY; i++) {
    const row: number[] = [];
    for(let j: number = 0; j <= maxX; j++) {
      row.push(0);
    }
    matrix.push(row);
  }

  return matrix;
}

const drawLines = (lines: Array<Line>, matrix: number[][], diagonal: boolean = false) => {
  for(const line of lines) {
    if(line.pointA.x === line.pointB.x) {
      for(let i: number = Math.min(line.pointA.y, line.pointB.y); i <= Math.max(line.pointA.y, line.pointB.y); i++) {
        matrix[i][line.pointA.x]++;
      }
    } else if (line.pointA.y === line.pointB.y) {
      for(let i: number = Math.min(line.pointA.x, line.pointB.x); i <= Math.max(line.pointA.x, line.pointB.x); i++) {
        matrix[line.pointA.y][i]++;
      }
    } else if(diagonal) {
      const minY: number = Math.min(line.pointA.y, line.pointB.y);
      const maxY: number = Math.max(line.pointA.y, line.pointB.y);

      const startPoint: Point = line.pointA.y < line.pointB.y ? line.pointA : line.pointB;
      const endPoint: Point = line.pointA.y < line.pointB.y ? line.pointB : line.pointA;
      let j: number = startPoint.x;

      for(let i: number = minY; i <= maxY; i++) {
        matrix[i][j]++;
        if(startPoint.x > endPoint.x) {
          j--;
        } else {
          j++;
        }
      }
    }
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const matrix: number[][] = createMatrix(input);
  drawLines(input, matrix);
  let count: number = matrix.select((c) => c.where((d) => d > 1).count()).sum();
  return count;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const matrix: number[][] = createMatrix(input);
  drawLines(input, matrix, true);
  let count: number = matrix.select((c) => c.where((d) => d > 1).count()).sum();
  return count;
}

run({
  part1: {
    tests: [
      { 
        input: `0,9 -> 5,9
                8,0 -> 0,8
                9,4 -> 3,4
                2,2 -> 2,1
                7,0 -> 7,4
                6,4 -> 2,0
                0,9 -> 2,9
                3,4 -> 1,4
                0,0 -> 8,8
                5,5 -> 8,2`, 
        expected: 5 
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { 
        input: `0,9 -> 5,9
                8,0 -> 0,8
                9,4 -> 3,4
                2,2 -> 2,1
                7,0 -> 7,4
                6,4 -> 2,0
                0,9 -> 2,9
                3,4 -> 1,4
                0,0 -> 8,8
                5,5 -> 8,2`, 
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
