const areFieldsProvided = require('../areFieldsProvided');

const requiredFields = [
    'cat',
    'dog',
    'elephant',
    'mouse'
];

test('No requiredFields should be satisfied by an empty object.', () => {
    expect(areFieldsProvided([], {})).toBeTruthy();
});

test('Fail if not all of the required fields are provided.', () => {
    let testCases = [
        {
            cat: 1,
            dog: 2,
            elephant: 3
        },
        {
            cat: 1,
            dog: 2,
            elephant: 3,
            bat: 5
        }
    ];

    testCases.forEach((testCase) => {
        expect(areFieldsProvided(requiredFields, testCase)).toBeFalsy();
    });
});

test('Pass if at least all of the required fields are provided.', () => {
    let testCases = [
        {
            cat: 1,
            dog: 2,
            elephant: 3,
            mouse: 4
        },
        {
            cat: 1,
            dog: 2,
            elephant: 3,
            mouse: 4,
            bat: 5
        }
    ];

    testCases.forEach((testCase) => {
        expect(areFieldsProvided(requiredFields, testCase)).toBeTruthy();
    });
});

test('Pass if the required field is defined, despite its value (except explicit undefined value).', () => {
    let testCases = [
        {
            cat: 0,
            dog: 2,
            elephant: 3,
            mouse: 4
        },
        {
            cat: false,
            dog: 2,
            elephant: 3,
            mouse: 4
        },
        {
            cat: null,
            dog: 2,
            elephant: 3,
            mouse: 4
        },
        {
            cat: '',
            dog: 2,
            elephant: 3,
            mouse: 4
        }
    ];

    testCases.forEach((testCase) => {
        expect(areFieldsProvided(requiredFields, testCase)).toBeTruthy();
    });
});


test('Accepts an Array as input.', () => {
    let testCases = {
        invalid: [
            {
                cat: 1,
                dog: 2,
                elephant: 3
            },
            {
                cat: 1,
                dog: 2,
                elephant: 3,
                bat: 5
            }
        ],
        valid: [
            {
                cat: 1,
                dog: 2,
                elephant: 3,
                mouse: 4
            },
            {
                cat: 1,
                dog: 2,
                elephant: 3,
                mouse: 4,
                bat: 5
            }
        ]
    };

    expect(areFieldsProvided(requiredFields, testCases.valid)).toBeTruthy();
    expect(areFieldsProvided(requiredFields, testCases.invalid)).toBeFalsy();
});