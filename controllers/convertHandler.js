function ConvertHandler() {
  this.getNum = function (input) {
    let result;

    const startsWithDigit = /^\d+(\.\d+)?(\/\d+(\.\d+)?)?/;
    const startsWithUnit = /^(gal|L|mi|km|lbs|kg)$/;

    const digitMatches = input.match(startsWithDigit);
    const onlyUnitMatches = input.match(startsWithUnit);

    //if starts with valid unit and not digit. this should be 1
    if (onlyUnitMatches) {
      result = 1;
    }

    //if any matches
    else if (digitMatches !== null) {
      const match = digitMatches[0];

      //analyze matched unit
      //if fractional unit
      if (match.includes('/')) {
        result =
          match.slice(0, match.indexOf('/')) /
          match.slice(match.indexOf('/') + 1, match.length);
      } else {
        //
        //else is whole or decimal number
        result = +digitMatches[0];
      }
    } else {
      //if does not matches any
      result = null;
      // console.log('invalid number');
    }

    return result;
  };

  this.getUnit = function (input) {
    let result;

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };
}

module.exports = ConvertHandler;
