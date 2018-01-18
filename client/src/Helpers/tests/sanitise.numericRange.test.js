import { default as sanitise } from '../sanitise';

test('Values outside of the range should return the range extremeties.', () => {
    let min = 100;
    let max = 599;

    let testCases = [
        { input: 99, output: 100 },
        { input: 600, output: 599 }
    ];

    testCases.forEach((testCase) => {
        expect(sanitise.numericRange(min, max)(testCase.input)).toEqual(testCase.output);
    });
});

test('Values at the range extremeties should return unchanged.', () => {
    let min = 100;
    let max = 599;

    let testCases = [
        { input: 100, output: 100 },
        { input: 599, output: 599 }
    ];

    testCases.forEach((testCase) => {
        expect(sanitise.numericRange(min, max)(testCase.input)).toEqual(testCase.output);
    });
});

test('Values within the range should return unchanged.', () => {
    let min = 100;
    let max = 599;

    let testCases = [
        { input: 200, output: 200 },
        { input: 400, output: 400 },
        { input: 404, output: 404 }
    ];

    testCases.forEach((testCase) => {
        expect(sanitise.numericRange(min, max)(testCase.input)).toEqual(testCase.output);
    });
});