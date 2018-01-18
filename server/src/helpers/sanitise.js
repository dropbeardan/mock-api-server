const alphaNumeric = (input) => {
    if (!input) {
        return '';
    }

    return String(input).replace(/[^a-z0-9_\-]/gi, '');
};

const numeric = (input) => {
    let value = String(input).replace(/[^0-9]/gi, '');

    return Number(value);
};

const numericRange = (min, max) => {
    return (input) => {
        let value = numeric(input);

        if (value < min) {
            return min;
        }

        if (value > max) {
            return max;
        }

        return Number(value);
    };
};

const route = (input) => {
    if (!input) {
        return '/';
    }

    let sanitisedInput = String(input).replace(/[^a-z0-9_\-\.\/]/gi, '');

    return sanitisedInput.charAt(0) == '/' ? sanitisedInput : `/${sanitisedInput}`;
}

module.exports = {
    alphaNumeric: alphaNumeric,
    numeric: numeric,
    numericRange: numericRange,
    route: route
};