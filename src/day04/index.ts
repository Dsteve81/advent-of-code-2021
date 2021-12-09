import run from "aocrunner";
import "array-linq";

interface IGameNumber {
  Value: number;
  Selected: boolean;
}

const parseInput = (rawInput: string): Array<string> => rawInput.split('\n').select((c) => c.trim());

const getGames = (rows: Array<string>): Array<Array<Array<IGameNumber>>> => {
  const games: Array<Array<Array<IGameNumber>>> = new Array();
  let game: Array<Array<IGameNumber>> = [];

  for(let i: number = 2; i < rows.length; i++) {
    if(rows[i].trim() !== "") {
      const row: Array<IGameNumber> = [];
      const rowChars: Array<string> = Array.from(rows[i]);
      let nr: string = "";

      for(let j: number = 0; j < rowChars.length; j++) {
        if(rowChars[j] === " ") {
          if(nr !== "") {
            row.push({ Value: +nr, Selected: false });
            nr = "";
          }
        } else {
          nr += rowChars[j];
        }
      }

      if(nr !== "") {
        row.push({ Value: +nr, Selected: false });
      }

      game.push(row);
    } else {
      games.push(game);
      game = [];
    }
  }

  games.push(game);

  return games;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const numbers: Array<number> = input[0].split(',').map(Number);
  const games = getGames(input);

  for(let i: number = 0; i < numbers.length; i++) {
    for(let j: number = 0; j < games.length; j++) {
      for(let k: number = 0; k < games[j].length; k++) {
        for (let l: number = 0; l < games[j][k].length; l++) {
          if(games[j][k][l].Value === numbers[i]) {
            games[j][k][l].Selected = true;

            let rowSelectedCount: number = games[j][k].where((c) => c.Selected === true).count();
            if(rowSelectedCount === 5) {
              let boardUnmarkedSum: number = 0;
              for(let m: number = 0; m < games[j].length; m++) {
                for (let n: number = 0; n < games[j][m].length; n++) {
                  if(!games[j][m][n].Selected) {
                    boardUnmarkedSum += games[j][m][n].Value;
                  }
                }
              }
              return boardUnmarkedSum * numbers[i];
            }

            let colSelectedCount: number = games[j].select((c) => c[l]).where((c) => c.Selected === true).count();
            if(colSelectedCount === 5) {              
              let boardUnmarkedSum: number = 0;
              for(let m: number = 0; m < games[j].length; m++) {
                for (let n: number = 0; n < games[j][m].length; n++) {
                  if(!games[j][m][n].Selected) {
                    boardUnmarkedSum += games[j][m][n].Value;
                  }
                }
              }
              return boardUnmarkedSum * numbers[i];
            }
          }
        }        
      }
    }
  } 

  return 0;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const numbers: Array<number> = input[0].split(',').map(Number);
  const games = getGames(input);
  const readyBoards: Array<number> = [];
  let result: number = -1;

  for(let i: number = 0; i < numbers.length; i++) {
    for(let j: number = 0; j < games.length; j++) {
      if(!readyBoards.contains(j)) {
        for(let k: number = 0; k < games[j].length; k++) {
          for (let l: number = 0; l < games[j][k].length; l++) {
            if(games[j][k][l].Value === numbers[i]) {
              games[j][k][l].Selected = true;
              let rowFounded: boolean = false;

              let rowSelectedCount: number = games[j][k].where((c) => c.Selected === true).count();
              if(rowSelectedCount === 5) {
                rowFounded = true;
                readyBoards.push(j);
                if(readyBoards.length === games.length) {
                  let boardUnmarkedSum: number = 0;
                  for(let m: number = 0; m < games[j].length; m++) {
                    for (let n: number = 0; n < games[j][m].length; n++) {
                      if(games[j][m][n].Selected === false) {
                        boardUnmarkedSum += games[j][m][n].Value;
                      }
                    }
                  }
                  result = boardUnmarkedSum * numbers[i];
                }              
              }

              let colSelectedCount: number = games[j].select((c) => c[l]).where((c) => c.Selected === true).count();
              if(colSelectedCount === 5 && !rowFounded) {  
                readyBoards.push(j);     
                if(readyBoards.length === games.length) {
                  let boardUnmarkedSum: number = 0;
                  for(let m: number = 0; m < games[j].length; m++) {
                    for (let n: number = 0; n < games[j][m].length; n++) {
                      if(games[j][m][n].Selected === false) {
                        boardUnmarkedSum += games[j][m][n].Value;
                      }
                    }
                  }
                  result = boardUnmarkedSum * numbers[i];
                }       
              }
            }
          }        
        }
      }
    }
  } 

  return result;
}

run({
  part1: {
    tests: [
      { 
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

        22 13 17 11  0
         8  2 23  4 24
        21  9 14 16  7
         6 10  3 18  5
         1 12 20 15 19
        
         3 15  0  2 22
         9 18 13 17  5
        19  8  7 25 23
        20 11 10 24  4
        14 21 16 12  6
        
        14 21 17 24  4
        10 16 15  9 19
        18  8 23 26 20
        22 11 13  6  5
         2  0 12  3  7`, 
        expected: 4512 
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { 
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

        22 13 17 11  0
         8  2 23  4 24
        21  9 14 16  7
         6 10  3 18  5
         1 12 20 15 19
        
         3 15  0  2 22
         9 18 13 17  5
        19  8  7 25 23
        20 11 10 24  4
        14 21 16 12  6
        
        14 21 17 24  4
        10 16 15  9 19
        18  8 23 26 20
        22 11 13  6  5
         2  0 12  3  7`, 
        expected: 1924 
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
