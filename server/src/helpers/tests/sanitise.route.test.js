const sanitise = require('../sanitise');

test('Empty route should return forward slash.', () => {
    let testCases = [
        { input: '', output: '/' },
        { input: null, output: '/' },
        { input: undefined, output: '/' }
    ];

    testCases.forEach((testCase) => {
        expect(sanitise.route(testCase.input)).toEqual(testCase.output);
    });
});

test('Routes beginning with a forward slash should return the route unchanged.', () => {
    let testCases = [
        { input: '/', output: '/' },
        { input: '/abc', output: '/abc' },
        { input: '/abc/123', output: '/abc/123' }
    ];

    testCases.forEach((testCase) => {
        expect(sanitise.route(testCase.input)).toEqual(testCase.output);
    });
});

test('Routes not beginning with a forward slash should return with the route beginning with a forward slash.', () => {
    let testCases = [
        { input: 'abc', output: '/abc' },
        { input: 123, output: '/123' },
        { input: 'abc/123', output: '/abc/123' }
    ];

    testCases.forEach((testCase) => {
        expect(sanitise.route(testCase.input)).toEqual(testCase.output);
    });
});

test('Routes containing symbols (except dots, dashes, underscores and forward slash) should return a filtered string.', () => {
    let testCases = [
        { input: '/', output: '/' },
        { input: '/abc', output: '/abc' },
        { input: '/abc/123', output: '/abc/123' },
        { input: '/abc-123', output: '/abc-123' },
        { input: '/abc_123', output: '/abc_123' },
        { input: '/1.23', output: '/1.23' },
        { input: '/ab.', output: '/ab.' },
        { input: '/a,b', output: '/ab' },
        { input: '/a b', output: '/ab' },
        { input: '/ab?', output: '/ab' },
        { input: '/a"b', output: '/ab' },
        { input: '/a\'b', output: '/ab' },
        { input: '/a#1', output: '/a1' }
    ];

    testCases.forEach((testCase) => {
        expect(sanitise.route(testCase.input)).toEqual(testCase.output);
    });
});