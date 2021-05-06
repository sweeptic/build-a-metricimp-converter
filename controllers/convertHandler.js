function ConvertHandler() {
  const units = /^(gal|L|mi|km|lbs|kg)$/i;
  const firsLetter = /[a-zA-Z]/;
  const startsWithDigit = /^\d+(\.\d+)?(\/\d+(\.\d+)?)?$/;
  const conversionDictionary = {
    gal: ['gallons', 3.78541, 'L'],
    L: ['liters', 0.26417, 'gal'],
    mi: ['miles', 1.60934, 'km'],
    km: ['kilometers', 0.62137, 'mi'],
    lbs: ['pounds', 0.45359, 'kg'],
    kg: ['kilograms', 2.20462, 'lbs'],
  };

  this.getNum = function (input) {
    let result;

    const toFirstLetter = input.slice(
      0,
      input.match(firsLetter) ? input.match(firsLetter).index : input.length
    );

    const digitMatches = toFirstLetter.match(startsWithDigit);
    const onlyUnitMatches = input.match(units);

    //if starts with valid unit and not digit. this should be 1
    if (onlyUnitMatches) {
      result = 1;
    }

    //if any matches
    //
    else if (digitMatches !== null) {
      const match = digitMatches[0];

      //analyze matched unit
      //if fractional unit
      if (match.includes('/')) {
        result =
          +match.slice(0, match.indexOf('/')) /
          +match.slice(match.indexOf('/') + 1, match.length);
      } else {
        //else is whole or decimal number
        result = +digitMatches[0];
      }
    }
    //if does not matches any
    else {
      result = false;
    }

    return result;
  };

  this.getUnit = function (input) {
    const fromFirstLetter = input.slice(
      input.match(firsLetter) ? input.match(firsLetter).index : input.length
    );

    return fromFirstLetter.match(units)
      ? fromFirstLetter === 'L' || fromFirstLetter === 'l'
        ? 'L'
        : fromFirstLetter.toLowerCase()
      : false;
  };

  this.getReturnUnit = function (initUnit) {
    return conversionDictionary[initUnit][2];
  };

  this.spellOutUnit = function (unit) {
    return conversionDictionary[unit][0];
  };

  this.convert = function (initNum, initUnit) {
    return initNum * conversionDictionary[initUnit][1].toFixed(6);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
