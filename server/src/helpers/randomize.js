const string = (length) => {
    let result = '';

    for (let i = 0; i < length; i++) {
        let key = Math.floor(Math.random() * 36);

        if (key < 10) {
            result = result + String.fromCharCode(key + 48);
        } else {
            result = result + String.fromCharCode(key + 55);
        }
    }

    return result;
};

module.exports = {
    string: string
};