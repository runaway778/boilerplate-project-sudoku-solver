class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return 'Expected puzzle to be 81 characters long';
    }
    if (/[^\d.]/.test(puzzleString)) {
      return 'Invalid characters in puzzle';
    }
    return 'Valid puzzle';
  }

  checkRowPlacement(puzzleString, row, column, value) {
    row = row.charCodeAt() - 'A'.charCodeAt();
    --column;
    for (let i = row * 9; i < (row + 1) * 9; ++i) {
      if (i % 9 != column && puzzleString[i] == value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    row = row.charCodeAt() - 'A'.charCodeAt();
    --column;
    for (let i = column; i < 81; i += 9) {
      if (Math.floor(i / 9) != row && puzzleString[i] == value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    row = row.charCodeAt() - 'A'.charCodeAt();
    --column;
    for (let i = 0; i < 81; ++i) {
      if ((row - row % 3 == Math.floor(i / 9) - Math.floor(i / 9) % 3)
        && (column - column % 3 == i % 9 - i % 9 % 3)
        && (Math.floor(i / 9) != row || i % 9 != column)
        && puzzleString[i] == value) {
        return false;
      }
    }
    return true;
  }

  solve(puzzleString) {
    for (let i = 0; i < 81; ++i) {
      if (puzzleString[i] == '.') {
        for (let x = 1; x <= 9; ++x) {
          const row = String.fromCharCode('A'.charCodeAt() + Math.floor(i / 9));
          const column = i % 9 + 1;
          puzzleString = puzzleString.substring(0, i) + x + puzzleString.substring(i + 1);
          if (this.checkRowPlacement(puzzleString, row, column, x)
           && this.checkColPlacement(puzzleString, row, column, x)
           && this.checkRegionPlacement(puzzleString, row, column, x)) {
            const res = this.solve(puzzleString);
            if (res != 'Puzzle cannot be solved') {
              return res;
            } else {
              continue;
            }
          }
        }
        return 'Puzzle cannot be solved';
      }
    }
    return puzzleString;
  }
}

module.exports = SudokuSolver;

