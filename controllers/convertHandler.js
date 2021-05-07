class ConvertHandler {
  constructor() {
    this.store = {
      gal: ['gallons', 3.78541, 'l', false],
      l: ['liters', 0.264172176857989, 'gal', true],
      mi: ['miles', 1.60934, 'km', false],
      km: ['kilometers', 0.6213727366498068, 'mi', false],
      lbs: ['pounds', 0.453592, 'kg', false],
      kg: ['kilograms', 2.204624420183777, 'lbs', false],
    };
    this.numPattern = /^\d+(\.\d+)?(\/\d+(\.\d+)?)?$/;
    this.letterPattern = /[a-zA-Z]/;

    this.getNum = input => {
      let result;
      const num = input.slice(0, this.getFirstLetter(input));
      const digits = num.match(this.numPattern);

      if (this.store[input.toLowerCase()]) {
        result = 1;
      } else if (digits !== null) {
        const match = digits[0];
        const fSlashIdx = match.indexOf('/');

        result =
          fSlashIdx > 0
            ? match.slice(0, fSlashIdx) /
              match.slice(fSlashIdx + 1, match.length)
            : +digits[0];
      } else {
        result = false;
      }

      return result;
    };

    this.getFirstLetter = input => {
      return input.match(this.letterPattern)
        ? input.match(this.letterPattern).index
        : input.length;
    };

    this.getUnit = input => {
      const unit = input.slice(this.getFirstLetter(input)).toLowerCase();

      return this.store[unit] ? unit : false;
    };

    this.getReturnUnit = initUnit => {
      return this.store[initUnit][2];
    };

    this.spellOutUnit = unit => {
      return this.store[unit.toLowerCase()][0];
    };

    this.convert = (initNum, initUnit) => {
      return +(initNum * this.store[initUnit][1]).toFixed(5);
    };

    this.getString = (initNum, initUnit, returnNum, returnUnit) => {
      return `${initNum} ${this.spellOutUnit(
        initUnit
      )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    };

    this.letterTransformationFunc = unit => {
      return this.store[unit][3] ? unit.toUpperCase() : unit;
    };
  }
}
module.exports = ConvertHandler;
