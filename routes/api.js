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

    let resultString;
    let convertedResultObj;

    //if get some false from getNum or/and getUnit function.
    if (!resultNum || !resultUnit) {
      if (!resultNum && !resultUnit) {
        resultString = 'invalid number and unit';
      } else if (!resultNum) {
        resultString = 'invalid number';
      } else {
        resultString = 'invalid unit';
      }
    } else {
      const convertedResult = convertHandler.convert(resultNum, resultUnit);

      resultString = `${resultNum} ${convertHandler.spellOutUnit(
        resultUnit
      )} converts to `;

      convertedResultObj = {
        initNum: resultNum,
        initUnit: resultUnit,
        returnNum: 'none',
        returnUnit: 'none',
        string: resultString,
      };
    }

    res.json(convertedResultObj ? { ...convertedResultObj } : resultString);
  });
};
