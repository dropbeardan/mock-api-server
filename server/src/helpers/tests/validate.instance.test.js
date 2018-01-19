const sanitise = require('../sanitise');
const validate = require('../validate');

const isValid = (instance) => {
    return validate.instance(sanitise.alphaNumeric(instance));
};

test('Instance cannot be empty, null or undefined.', () => {
    let testCases = [
        '',
        ' ',
        null,
        undefined
    ];

    testCases.forEach((testCase) => {
        expect(isValid(testCase)).toBeFalsy();
    })
});

test('Instance should not be a reserved keyword.', () => {
    let testCases = [
        'endpoints',
        'instances',
        'resources',
        'sessions'
    ];

    testCases.forEach((testCase) => {
        expect(isValid(testCase)).toBeFalsy();
    })
});


test('Instances that are not empty or a reserved keyword are valid.', () => {
    let testCases = [
        'tom',
        'TOM',
        'To_M',
        'ToM-123',
        'ToM-/#@%%^#$123'
    ];

    testCases.forEach((testCase) => {
        expect(isValid(testCase)).toBeTruthy();
    })
});