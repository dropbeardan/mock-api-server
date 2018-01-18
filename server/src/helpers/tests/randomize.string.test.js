const randomize = require('../randomize');

test('Zero length should return empty string.', () => {
    let result = randomize.string(0);

    expect(typeof (result)).toEqual('string');
    expect(result).toEqual('');
});

test('N length should return n-length string of uppercase letters and numbers.', () => {
    let length = 10000;
    let result = randomize.string(length);

    expect(typeof (result)).toEqual('string');
    expect(result.length).toEqual(length);

    for (let i = 0; i < length; i++) {
        expect(
            (result.charCodeAt(i) >= 48 && result.charCodeAt(i) <= 57) ||
            (result.charCodeAt(i) >= 65 && result.charCodeAt(i) <= 90)
        ).toBeTruthy();
    }
});