const sanitise = require('../sanitise');

test('Input containing numbers only should return an integer equivalent of the input.', () => {
    let testCases = [
        { input: 123, output: 123 },
        { input: '0123', output: 123 },
        { input: '1230', output: 1230 }
    ];

    testCases.forEach((testCase) => {
        expect(sanitise.numeric(testCase.input)).toEqual(testCase.output);
    });
});

test('Input containing non-numeric characters should be stripped of any non-numeric characters.', () => {
    let testCases = [
        { input: 'a', output: 0 },
        { input: 'abc123', output: 123 },
        { input: '.123', output: 123 },
        { input: '12 3', output: 123 },
        { input: '12.3', output: 123 },
        { input: '.123', output: 123 },
        { input: '12-3', output: 123 }
    ];

    testCases.forEach((testCase) => {
        expect(sanitise.numeric(testCase.input)).toEqual(testCase.output);
    });
});