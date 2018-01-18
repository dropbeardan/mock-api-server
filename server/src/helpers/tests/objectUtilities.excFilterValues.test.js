const objectUtilities = require('../objectUtilities');

test('Objects with no properties matching filter value should return unchanged.', () => {
    let testCases = [
        { input: { a: 'a', b: 'b' }, filter: ['abc'], output: { a: 'a', b: 'b' } }
    ];

    testCases.forEach((testCase) => {
        expect(objectUtilities.excFilterValues(testCase.input, testCase.filter)).toEqual(testCase.output);
    });
});

test('Filter should remove any underfined, empty or null values.', () => {
    let object = {
        a: undefined,
        b: null,
        c: ''
    };

    let testCases = [
        { input: object, filter: [undefined], output: { b: null, c: '' } },
        { input: object, filter: [null], output: { a: undefined, c: '' } },
        { input: object, filter: [''], output: { a: undefined, b: null } }
    ];

    testCases.forEach((testCase) => {
        expect(objectUtilities.excFilterValues(testCase.input, testCase.filter)).toEqual(testCase.output);
    });
});