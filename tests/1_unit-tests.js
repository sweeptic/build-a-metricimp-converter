const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  test('convertHandler should correctly read a whole number input. ', () => {
    assert.equal(convertHandler.getNum('1'), 1);
    assert.equal(convertHandler.getNum('12gal'), 12);
    assert.equal(convertHandler.getNum('123lbs'), 123);
    assert.equal(convertHandler.getNum('123lbs123'), 123);
    assert.equal(convertHandler.getNum('123mi'), 123);
    assert.isNull(convertHandler.getNum('mi123'));
    assert.isNull(convertHandler.getNum('mi123mi'));
    assert.isNull(convertHandler.getNum('   '));
    assert.isNull(convertHandler.getNum('  23mi'));
    assert.isNull(convertHandler.getNum('  mi23'));
  });
  test('convertHandler should correctly read a decimal number input. ', () => {
    assert.equal(convertHandler.getNum('1.1'), 1.1);
    assert.equal(convertHandler.getNum('1.1111'), 1.1111);
    assert.equal(convertHandler.getNum('12.6gal'), 12.6);
    assert.equal(convertHandler.getNum('123.44lbs'), 123.44);
    assert.equal(convertHandler.getNum('123.555lbs123'), 123.555);
    assert.equal(convertHandler.getNum('123.1110mi'), 123.111);
    assert.isNull(convertHandler.getNum('mi123.34'));
    assert.isNull(convertHandler.getNum('mi123.4mi'));
    assert.isNull(convertHandler.getNum('   '));
    assert.isNull(convertHandler.getNum('  23.2mi'));
    assert.isNull(convertHandler.getNum('  mi23.5'));
  });
});

/*


convertHandler should correctly read a fractional input.
convertHandler should correctly read a fractional input with a decimal.
convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
convertHandler should correctly read each valid input unit.
convertHandler should correctly return an error for an invalid input unit.
convertHandler should return the correct return unit for each valid input unit.
convertHandler should correctly return the spelled-out string unit for each valid input unit.
convertHandler should correctly convert gal to L.
convertHandler should correctly convert L to gal.
convertHandler should correctly convert mi to km.
convertHandler should correctly convert km to mi.
convertHandler should correctly convert lbs to kg.
convertHandler should correctly convert kg to lbs.

*/
