'use strict';
const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    const { input } = req.query;

    // console.log(input);

    const resultNum = convertHandler.getNum(input);
    let resultUnit = convertHandler.getUnit(input);

    let resultString;
    let convertedResultObj;

    //if get some false(invalid) from getNum or/and getUnit function.
    if (!resultNum || !resultUnit) {
      if (!resultNum && !resultUnit) {
        resultString = 'invalid number and unit';
      } else if (!resultNum) {
        resultString = 'invalid number';
      } else {
        resultString = 'invalid unit';
      }
    } else {
      const convertedNum = convertHandler.convert(resultNum, resultUnit);
      let convertedUnit = convertHandler.getReturnUnit(resultUnit);

      resultUnit = convertHandler.letterTransformationFunc(resultUnit);
      convertedUnit = convertHandler.letterTransformationFunc(convertedUnit);

      resultString = convertHandler.getString(
        resultNum,
        resultUnit,
        convertedNum,
        convertedUnit
      );

      convertedResultObj = {
        initNum: resultNum,
        initUnit: resultUnit,
        returnNum: convertedNum,
        returnUnit: convertedUnit,
        string: resultString,
      };
    }

    res.json(convertedResultObj ? { ...convertedResultObj } : resultString);
  });
};
