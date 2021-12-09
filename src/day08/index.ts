import run from "aocrunner";
import "array-linq";

const parseInput = (rawInput: string): Array<string> => rawInput.split('\n').select((c) => c.trim());

const decode = (input: string, codes: Array<string>): number => {
  const codeOne = codes.where((c) => c.length === 2)[0];
  const codeOneChars = Array.from(codeOne);
  const codeFour = codes.where((c) => c.length === 4)[0];
  const codeThree = codes.where((c) => c.length === 5 && Array.from(c).contains(codeOne[0]) && Array.from(c).contains(codeOne[1]))[0];
  const temp = codes.where((c) => c !== codeThree && c.length === 5); // code five & two
  const segmentChars = Array.from(codeFour).where((c) => !codeOneChars.contains(c)); // remaining chars after code one chars were removed
  const centerSegment = temp.where((c) => Array.from(c).contains(segmentChars[0])).count() === 2 ? segmentChars[0] : segmentChars[1];
  const topLeftSegment = segmentChars.where((c) => c !== centerSegment)[0];

  switch (input.length) {
    case 7: return 8;
    case 2: return 1;
    case 4: return 4;
    case 3: return 7;
    case 6: {
      const chars = Array.from(input);
      if(chars.contains(codeOneChars[0]) && chars.contains(codeOneChars[1]) && chars.contains(centerSegment)) {
        return 9;
      } else if(!chars.contains(centerSegment)) {
        return 0;
      } else {
        return 6;
      }
    };
    case 5: {
      const chars = Array.from(input);
      if (chars.contains(codeOneChars[0]) && chars.contains(codeOneChars[1])) {
        return 3;
      } else if (chars.contains(topLeftSegment)) {
        return 5;
      } else {
        return 2;
      }
    }
  }
  return -1;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const result: number = input.select((c) => c.split(' | ')[1].split(' ').where((d) => [2, 4, 3, 7].contains(d.length)).count()).sum();
  return result;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);  
  const result: number = input.select((c) => +c.split(' | ')[1].split(' ').select((d) => decode(d.trim(), c.split(' | ')[0].split(' '))).join("")).sum();
  return result;
}

run({
  part1: {
    tests: [
      { 
        input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
                edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
                fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
                fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
                aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
                fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
                dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
                bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
                egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
                gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`, 
        expected: 26 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { 
        input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
                edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
                fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
                fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
                aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
                fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
                dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
                bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
                egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
                gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`, 
        expected: 61229 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false
});
