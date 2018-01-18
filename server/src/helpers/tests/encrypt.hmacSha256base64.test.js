const encrypt = require('../encrypt');

const secret = 'secret';

test('String encryption should work with letters, numbers and symbols.', () => {

    let testCases = [
        '012',
        'ABC',
        '~!@#$%^&*()-={}[].,;',
        'ABC012~!@#$%^&*()-={}[].,;'
    ];

    testCases.forEach((testCase) => {
        expect(encrypt.hmacSha256base64(testCase, secret)).toBeDefined();
        expect(encrypt.hmacSha256base64(testCase, secret)).not.toBeNull();
        expect(encrypt.hmacSha256base64(testCase, secret)).not.toBe('');
    });
});

test('String encryption with same data and secret should produce same cipher.', () => {

    let data = 'ABC@123.';

    let ciphers = [];

    for (let i = 0; i < 10; i++) {
        ciphers.push(encrypt.hmacSha256base64(data, secret));
    }

    let uniqueCiphers = ciphers.filter((cipher) => {
        return cipher != ciphers[0];
    });

    expect(uniqueCiphers.length).toBe(0);
});

test('String encryption with same data and different secrets should produce different ciphers.', () => {

    let data = 'ABC123';
    let testCases = [
        'secret1',
        'secret2',
        'secret3',
    ];

    let ciphers = [];

    testCases.forEach((testCase) => {
        ciphers.push(encrypt.hmacSha256base64(data, testCase));
    });

    ciphers.forEach((cipher, index) => {
        expect(ciphers.lastIndexOf(cipher)).toBe(index);
    });
});

test('String encryption with different data and same secrets should produce different ciphers.', () => {

    let testCases = [
        'ABC123',
        'ABC12',
        'ABC',
        '123',
        'ABC123.',
        'ABC123;'
    ];

    let ciphers = [];

    testCases.forEach((testCase) => {
        ciphers.push(encrypt.hmacSha256base64(testCase, secret));
    });

    // Checks if the ciphers is unique.
    ciphers.forEach((cipher, index) => {
        expect(ciphers.lastIndexOf(cipher)).toBe(index);
    });
});