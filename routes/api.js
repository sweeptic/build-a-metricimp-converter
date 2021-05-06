'use strict';
const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    const { input } = req.query;

    const resultNum = convertHandler.getNum(input);
    const resultUnit = convertHandler.getUnit(input);

    console.log(resultNum);
    console.log(resultUnit);

    let result;

    if (!resultNum || !resultUnit) {
      if (!resultNum && !resultUnit) {
        result = 'invalid number and unit';
      } else if (!resultNum) {
        result = 'invalid number';
      } else {
        result = 'invalid unit';
      }
    }

    res.json(result);
  });
};
