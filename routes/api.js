'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  const solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      if (!req.body.puzzle || !req.body.coordinate || !req.body.value) {
        return res.json({ error: 'Required field(s) missing' });
      }
      if (!(req.body.coordinate.length == 2 
        && 'A' <= req.body.coordinate[0] && req.body.coordinate[0] <= 'I'
        && 1 <= req.body.coordinate[1] && req.body.coordinate[1] <= 9)) {
        return res.json({ error: 'Invalid coordinate' });
      }
      if (!(1 <= req.body.value && req.body.value <= 9)) {
        return res.json({ error: 'Invalid value' });
      }
      if (solver.validate(req.body.puzzle) != 'Valid puzzle') {
        return res.json({ error: solver.validate(req.body.puzzle) });
      }
      let conflict = [];
      if (!solver.checkRowPlacement(req.body.puzzle, req.body.coordinate[0], req.body.coordinate[1], req.body.value)) {
        conflict.push('row');
      }
      if (!solver.checkColPlacement(req.body.puzzle, req.body.coordinate[0], req.body.coordinate[1], req.body.value)) {
        conflict.push('column');
      }
      if (!solver.checkRegionPlacement(req.body.puzzle, req.body.coordinate[0], req.body.coordinate[1], req.body.value)) {
        conflict.push('region');
      }
      if (conflict.length) {
        return res.json({ valid: false, conflict });
      }
      return res.json({ valid: true });
    });

  app.route('/api/solve')
    .post((req, res) => {
      if (!req.body.puzzle) {
        return res.json({ error: 'Required field missing' });
      }
      if (solver.validate(req.body.puzzle) != 'Valid puzzle') {
        return res.json({ error: solver.validate(req.body.puzzle) });
      }
      const solution = solver.solve(req.body.puzzle);
      if (solution == 'Puzzle cannot be solved') {
        return res.json({ error: 'Puzzle cannot be solved' });
      }
      return res.json({ solution });
    });
};
