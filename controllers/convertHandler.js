function ConvertHandler() {
  const units = /^(gal|L|mi|km|lbs|kg)$/i;
  const firsLetter = /[a-zA-Z]/;
  const dictionary = {
    gal: 'gallons',
    L: 'liters',
    mi: 'miles',
    km: 'kilometers',
    lbs: 'pounds',
    kg: 'kilograms',
  };

  this.getNum = function (input) {
    let result;

    const startsWithDigit = /^\d+(\.\d+)?(\/\d+(\.\d+)?)?$/;
    // const startsWithUnit = /^(gal|L|mi|km|lbs|kg)$/;

    const toFirstLetter = input.slice(
      0,
      input.match(firsLetter) ? input.match(firsLetter).index : input.length
    );

    const digitMatches = toFirstLetter.match(startsWithDigit);
    const onlyUnitMatches = input.match(units);

    // console.log(toFirstLetter.length);

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
    let result;

    return result;
  };

  this.spellOutUnit = function (unit) {
    return dictionary[unit];
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
