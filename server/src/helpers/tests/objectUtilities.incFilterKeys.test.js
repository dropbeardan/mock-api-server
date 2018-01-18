const objectUtilities = require('../objectUtilities');

test('Empty object will return an empty object.', () => {
    let testCase = {};
    let allowedParams = [
        'a',
        'b',
        'c'
    ];

    expect(objectUtilities.incFilterKeys(testCase, allowedParams)).toEqual({});
});

test('Object with only allowable properties should return unchanged.', () => {
    let testCases = [
        { a: 1 },
        { a: 1, b: 2 },
        { a: 1, b: 2, c: 3 }
    ];

    let allowedParams = [
        'a',
        'b',
        'c'
    ];

    testCases.forEach((testCase) => {
        expect(objectUtilities.incFilterKeys(testCase, allowedParams)).toEqual(testCase);
    });
});

test('Object with additional properties will return an object with the additional properties removed.', () => {
    let testCases = [
        {
            input: { a: 1, b: 2, c: 3, d: 4 },
            output: { a: 1, b: 2, c: 3 }
        },
        {
            input: { z: 26, a: 1, b: 2 },
            output: { a: 1, b: 2 }
        }
    ];

    let allowedParams = [
        'a',
        'b',
        'c'
    ];

    testCases.forEach((testCase) => {
        expect(objectUtilities.incFilterKeys(testCase.input, allowedParams)).toEqual(testCase.output);
    });
});