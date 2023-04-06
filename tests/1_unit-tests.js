const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');

suite('Unit Tests', () => {

    const solver = new Solver();

    test('Logic handles a valid puzzle string of 81 characters', () => {
        assert.equal(solver.validate('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'), 'Valid puzzle');
    });

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
        assert.equal(solver.validate('..9.a5.1.85.4....2432..$...1...69.83.9..J..6.62.71...9......1945....4.37.4.3..6..'), 'Invalid characters in puzzle');
    });

    test('Logic handles a puzzle string that is not 81 characters in length', () => {
        assert.equal(solver.validate('123'), 'Expected puzzle to be 81 characters long');
    });

    test('Logic handles a valid row placement', () => {
        assert.isTrue(solver.checkRowPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', 1, 4));
    });

    test('Logic handles an invalid row placement', () => {
        assert.isFalse(solver.checkRowPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', 1, 5));
    });

    test('Logic handles a valid column placement', () => {
        assert.isTrue(solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', 1, 7));
    });

    test('Logic handles an invalid column placement', () => {
        assert.isFalse(solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', 1, 1));
    });

    test('Logic handles a valid region (3x3 grid) placement', () => {
        assert.isTrue(solver.checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', 1, 6));
    });

    test('Logic handles an invalid region (3x3 grid) placement', () => {
        assert.isFalse(solver.checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', 1, 2));
    });

    test('Valid puzzle strings pass the solver', () => {
        assert.notEqual(solver.solve('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'), 'Puzzle cannot be solved');
    });

    test('Invalid puzzle strings fail the solver', () => {
        assert.equal(solver.solve('..99.5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'), 'Puzzle cannot be solved');
    });

    test('Solver returns the expected solution for an incomplete puzzle', () => {
        assert.equal(solver.solve('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'),
                     '769235418851496372432178956174569283395842761628713549283657194516924837947381625');
    });

});
