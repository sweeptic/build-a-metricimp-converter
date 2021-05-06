function ConvertHandler() {
  // const units = /^(gal|L|mi|km|lbs|kg)$/i;
  const firsLetter = /[a-zA-Z]/;
  const startsWithDigit = /^\d+(\.\d+)?(\/\d+(\.\d+)?)?$/;
  const conversionDictionary = {
    gal: ['gallons', 3.78541, 'l', false],
    l: ['liters', 0.264172176857989, 'gal', true],
    mi: ['miles', 1.60934, 'km', false],
    km: ['kilometers', 0.6213727366498068, 'mi', false],
    lbs: ['pounds', 0.453592, 'kg', false],
    kg: ['kilograms', 2.204624420183777, 'lbs', false],
  };

  this.getNum = function (input) {
    let result;

    const toFirstLetter = input.slice(
      0,
      input.match(firsLetter) ? input.match(firsLetter).index : input.length
    );

    const digitMatches = toFirstLetter.match(startsWithDigit);

    const onlyUnitMatches = conversionDictionary[input.toLowerCase()];

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
    const fromFirstLetter = input
      .slice(
        input.match(firsLetter) ? input.match(firsLetter).index : input.length
      )
      .toLowerCase();

    return conversionDictionary[fromFirstLetter] ? fromFirstLetter : false;
  };

  this.getReturnUnit = function (initUnit) {
    return conversionDictionary[initUnit][2];
  };

  this.spellOutUnit = function (unit) {
    return conversionDictionary[unit.toLowerCase()][0];
  };

  this.convert = function (initNum, initUnit) {
    return +(initNum * conversionDictionary[initUnit][1]).toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

  this.letterTransformationFunc = function (unit) {
    return conversionDictionary[unit][3] ? unit.toUpperCase() : unit;
  };
}

module.exports = ConvertHandler;
