const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('getNum Unit Tests', function () {
  test('convertHandler should correctly read a whole number input. ', () => {
    assert.strictEqual(convertHandler.getNum('1'), 1);
    assert.strictEqual(convertHandler.getNum('12gal'), 12);
    assert.strictEqual(convertHandler.getNum('123lbs'), 123);
    assert.strictEqual(convertHandler.getNum('123lbs123'), 123);
    assert.strictEqual(convertHandler.getNum('123mi'), 123);

    assert.strictEqual(convertHandler.getNum('mi123'), false);
    assert.strictEqual(convertHandler.getNum('mi123mi'), false);
    assert.strictEqual(convertHandler.getNum('   '), false);
    assert.strictEqual(convertHandler.getNum('  23mi'), false);
    assert.strictEqual(convertHandler.getNum('  mi23'), false);
  });

  test('convertHandler should correctly read a decimal number input. ', () => {
    assert.strictEqual(convertHandler.getNum('1.1'), 1.1);
    assert.strictEqual(convertHandler.getNum('1.1111'), 1.1111);
    assert.strictEqual(convertHandler.getNum('12.6gal'), 12.6);
    assert.strictEqual(convertHandler.getNum('123.44lbs'), 123.44);
    assert.strictEqual(convertHandler.getNum('123.555lbs123'), 123.555);
    assert.strictEqual(convertHandler.getNum('123.1110mi'), 123.111);

    assert.strictEqual(convertHandler.getNum('mi123.34'), false);
    assert.strictEqual(convertHandler.getNum('mi123.4mi'), false);
    assert.strictEqual(convertHandler.getNum('   '), false);
    assert.strictEqual(convertHandler.getNum('  23.2mi'), false);
    assert.strictEqual(convertHandler.getNum('  mi23.5'), false);
  });

  test('convertHandler should correctly read a fractional input. ', () => {
    assert.strictEqual(convertHandler.getNum('1/2'), 0.5);
    assert.strictEqual(convertHandler.getNum('12/5gal'), 2.4);
    assert.strictEqual(convertHandler.getNum('1/2lbs'), 0.5);
    assert.strictEqual(convertHandler.getNum('1/2lbs123'), 0.5);
    assert.strictEqual(convertHandler.getNum('1/4mi'), 0.25);

    assert.strictEqual(convertHandler.getNum('mi123/34'), false);
    assert.strictEqual(convertHandler.getNum('mi123/3mi'), false);
    assert.strictEqual(convertHandler.getNum('  2/3mi'), false);
    assert.strictEqual(convertHandler.getNum('  mi23/2'), false);
  });

  test('convertHandler should correctly read a fractional input with a decimal. ', () => {
    assert.strictEqual(convertHandler.getNum('3.6/1.2'), 3);
    assert.strictEqual(convertHandler.getNum('1.5/2'), 0.75);
    assert.strictEqual(convertHandler.getNum('1/2.5'), 0.4);

    assert.strictEqual(convertHandler.getNum('1.5/2.5gal'), 0.6);
    assert.strictEqual(convertHandler.getNum('1/2.5gal'), 0.4);
    assert.strictEqual(convertHandler.getNum('1.5/2gal'), 0.75);

    assert.strictEqual(convertHandler.getNum('mi123.55/34.55'), false);
    assert.strictEqual(convertHandler.getNum('mi123.11/3.0mi'), false);
    assert.strictEqual(convertHandler.getNum('  2.33/3.1mi'), false);
    assert.strictEqual(convertHandler.getNum('  mi23.2/2'), false);
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided. ', () => {
    assert.strictEqual(convertHandler.getNum('gal'), 1);
    assert.strictEqual(convertHandler.getNum('L'), 1);
    assert.strictEqual(convertHandler.getNum('mi'), 1);
    assert.strictEqual(convertHandler.getNum('km'), 1);
    assert.strictEqual(convertHandler.getNum('lbs'), 1);
    assert.strictEqual(convertHandler.getNum('kg'), 1);
    assert.strictEqual(convertHandler.getNum('newtonMeter'), false);
  });

  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3). ', () => {
    assert.strictEqual(convertHandler.getNum('3/4/5'), false);
    assert.strictEqual(convertHandler.getNum('3.4/4/5'), false);
    assert.strictEqual(convertHandler.getNum('3/4.4/5'), false);
    assert.strictEqual(convertHandler.getNum('3/4/5.5'), false);
  });
});

suite('getUnit Unit Tests', function () {
  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3). ', () => {
    assert.strictEqual(convertHandler.getUnit('3/4/5'), false);
    assert.strictEqual(convertHandler.getUnit('3.4/4/5'), false);
    assert.strictEqual(convertHandler.getUnit('3/4.4/5'), false);
    assert.strictEqual(convertHandler.getUnit('3/4/5.5'), false);
  });
  //(gal|L|mi|km|lbs|kg)
  test('convertHandler should correctly read each valid input unit. ', () => {
    assert.strictEqual(convertHandler.getUnit('1/2.5gal'), 'gallons');
    assert.strictEqual(convertHandler.getUnit('1/2.5L'), 'L');
    assert.strictEqual(convertHandler.getUnit('1/2.5mi'), 'miles');
    assert.strictEqual(convertHandler.getUnit('1/2.5km'), 'kilometers');
    assert.strictEqual(convertHandler.getUnit('1/2.5lbs'), 'pounds');
    assert.strictEqual(convertHandler.getUnit('1/2.5kg'), 'kilograms');
    assert.strictEqual(convertHandler.getUnit('1kg'), 'kilograms');
  });

  test('convertHandler should correctly return an error for an invalid input unit. ', () => {
    assert.strictEqual(convertHandler.getUnit('1/2.5kghhh'), false);
  });

  test('convertHandler should return the correct return unit for each valid input unit. ', () => {
    assert.strictEqual(convertHandler.getUnit('1/2.5gal'), 'gallons');
    assert.strictEqual(convertHandler.getUnit('1/2.5L'), 'L');
    assert.strictEqual(convertHandler.getUnit('1/2.5mi'), 'miles');
    assert.strictEqual(convertHandler.getUnit('1/2.5km'), 'kilometers');
    assert.strictEqual(convertHandler.getUnit('1/2.5lbs'), 'pounds');
    assert.strictEqual(convertHandler.getUnit('1/2.5kg'), 'kilograms');
    assert.strictEqual(convertHandler.getUnit('1kg'), 'kilograms');
  });
});

/*









convertHandler should correctly return the spelled-out string unit for each valid input unit.
convertHandler should correctly convert gal to L.
convertHandler should correctly convert L to gal.
convertHandler should correctly convert mi to km.
convertHandler should correctly convert km to mi.
convertHandler should correctly convert lbs to kg.
convertHandler should correctly convert kg to lbs.

*/
