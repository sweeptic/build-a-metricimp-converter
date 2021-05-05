function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    // const regex = /^\d+/;

    const regex = /^\d+(\.\d+)|^\d+(\/\d+)?/;

    let matches = input.match(regex);

    // result = matches === null ? null : matches[0];

    //if any matches
    if (matches !== null) {
      const match = matches[0];

      //analyze matched unit
      //if fractional unit
      if (match.includes('/')) {
        result =
          match.slice(0, match.indexOf('/')) /
          match.slice(match.indexOf('/') + 1, match.length);
      } else {
        //
        //else is whole or decimal number
        result = +matches[0];
      }
    } else {
      //if does not matches any
      result = null;
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
