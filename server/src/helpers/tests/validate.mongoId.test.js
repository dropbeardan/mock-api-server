const validate = require('../validate');

test('Invalid Mongo IDs should return false', () => {
    let testCases = [
        '42925014-00d7-4574-8e89-cf92ebf1090b',
        '1F5BE003-0C45-4230-AA0E-61738CBEF1DC',
        '6E8DE6021CF54271B32ACD04FE1D36AC',
        '7c7fb8a5290447a1a4d2739c35c27e68',
        'abc21345',
        'a48ef4efb518f5161as2e394',
        '56cb91bdc3464f14678934ca1245sasd',
    ];

    testCases.forEach((testCase) => {
        expect(validate.mongoId(testCase)).toBeFalsy();
    })
});

test('Valid Mongo IDs should return true', () => {
    let testCases = [
        '56cb91bdc3464f14678934ca',
        '578df3efb618f5141202a196'
    ];

    testCases.forEach((testCase) => {
        expect(validate.mongoId(testCase)).toBeTruthy();
    })
});