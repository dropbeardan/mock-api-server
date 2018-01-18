import { default as sanitise } from '../sanitise';

test('Empty inputs should return empty string.', () => {
    let testCases = [
        { input: '', output: '' },
        { input: null, output: '' },
        { input: undefined, output: '' }
    ];

    testCases.forEach((testCase) => {
        expect(sanitise.alphaNumeric(testCase.input)).toEqual(testCase.output);
    });
});

test('Inputs containing letters, numbers, dashes and underscores only should return the String equivalent.', () => {
    let testCases = [
        'abc',
        'ABC',
        'AbC',
        123,
        'abc123',
        'ABC123',
        'AbC123',
        'abc_123',
        'abc-123'
    ];

    testCases.forEach((testCase) => {
        expect(sanitise.alphaNumeric(testCase)).toEqual(String(testCase));
    });
});

test('Inputs containing symbols other than dashes or underscores will return a string without the symbols.', () => {
    let testCases = [
        { input: 'a/', output: 'a' },
        { input: 'a/b', output: 'ab' },
        { input: 'a,b', output: 'ab' },
        { input: 'ab.', output: 'ab' },
        { input: 'a b', output: 'ab' },
        { input: 'ab?', output: 'ab' },
        { input: 'a"b', output: 'ab' },
        { input: 'a\'b', output: 'ab' },
        { input: 'a#1', output: 'a1' },
        { input: '1.23', output: '123' }
    ];

    testCases.forEach((testCase) => {
        expect(sanitise.alphaNumeric(testCase.input)).toEqual(testCase.output);
    });
});