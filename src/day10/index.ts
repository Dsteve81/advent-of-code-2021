import run from "aocrunner";
import "array-linq";

const parseInput = (rawInput: string): Array<any> => rawInput.split('\n').select((c) => Array.from(c.trim()));

const pairs: any = {
  "(": ")",
  "[":"]",
  "{": "}",
  "<": ">",
}

const values1: any = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
}

const values2: any = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const firstErrors: Array<string> = [];

  for(let i: number = 0; i < input.length; i++) {
    const stack: Array<string> = [];

    for(let j: number = 0; j < input[i].length; j++) {
      if(pairs[input[i][j]]) {
        stack.push(input[i][j]);
      } else {
        if(pairs[stack.last()] !== input[i][j]) {
          firstErrors.push(input[i][j]);
          break;
        } else {
          stack.splice(stack.length - 1, 1);
        }
      }
    }
  }

  let result: number = 0;

  for(const fail of firstErrors) {
    result += values1[fail];
  }

  return result;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const completeChars: Array<Array<string>> = [];

  for(let i: number = 0; i < input.length; i++) {
    let stack: Array<string> = [];
    let fail: boolean = false;

    for(let j: number = 0; j < input[i].length; j++) {
      if(pairs[input[i][j]]) {
        stack.push(input[i][j]);
      } else {
        if(pairs[stack.last()] !== input[i][j]) {
          fail = true;
          break;
        } else {
          stack.splice(stack.length - 1, 1);
        }
      }
    }

    if(!fail) {
      stack = input[i];
      let temp: Array<string> = [];

      for(let j: number = stack.length - 1; j >= 0; j--) {
        if(pairs[stack[j]]) {
          let openCount: number = 1;
          let closeCount: number = 0;

          for(let k: number = j + 1; k < stack.length; k++) {
            if(stack[k] === stack[j]) {
              openCount++;
            } else if (stack[k] === pairs[stack[j]]) {
              closeCount++;
            }
          }

          for(let k: number = 0; k < temp.length; k++) {
            if (temp[k] === pairs[stack[j]]) {
              closeCount++;
            }
          }

          if(openCount > closeCount) {
            temp.push(pairs[stack[j]]);
          }
        }
      }
      completeChars.push(temp);
    }
  }

  const scores: Array<number> = [];
  let result: number = 0;

  for(let i: number = 0; i < completeChars.length; i++) {
    let score: number = 0;
    for (let j: number = 0; j < completeChars[i].length; j++) {
      score *= 5;
      score += values2[completeChars[i][j]];
    }
    scores.push(score);
  }

  for(let i: number = 0; i < scores.length; i++) {
    if(scores.where((c) => c < scores[i]).length === scores.where((c) => c > scores[i]).length) {
      return scores[i];
    }
  }
}

run({
  part1: {
    tests: [
      { 
        input: `[({(<(())[]>[[{[]{<()<>>
                [(()[<>])]({[<{<<[]>>(
                {([(<{}[<>[]}>{[]{[(<()>
                (((({<>}<{<{<>}{[]{[]{}
                [[<[([]))<([[{}[[()]]]
                [{[{({}]{}}([{[{{{}}([]
                {<[[]]>}<{[{[{[]{()[[[]
                [<(<(<(<{}))><([]([]()
                <{([([[(<>()){}]>(<<{{
                <{([{{}}[<[[[<>{}]]]>[]]`, 
        expected: 26397
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { 
        input: `[({(<(())[]>[[{[]{<()<>>
                [(()[<>])]({[<{<<[]>>(
                {([(<{}[<>[]}>{[]{[(<()>
                (((({<>}<{<{<>}{[]{[]{}
                [[<[([]))<([[{}[[()]]]
                [{[{({}]{}}([{[{{{}}([]
                {<[[]]>}<{[{[{[]{()[[[]
                [<(<(<(<{}))><([]([]()
                <{([([[(<>()){}]>(<<{{
                <{([{{}}[<[[[<>{}]]]>[]]`, 
        expected: 288957
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false
});
