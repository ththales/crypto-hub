function createMatrix(key) {

    key = key
        .toUpperCase()
        .replace(/J/g, "I")
        .replace(/[^A-Z]/g, "");

    let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    let sequence = "";

    for (let char of key) {

        if (!sequence.includes(char)) {
            sequence += char;
        }

    }

    for (let char of alphabet) {

        if (!sequence.includes(char)) {
            sequence += char;
        }

    }

    let matrix = [];

    for (let i = 0; i < 5; i++) {

        matrix.push(sequence.slice(i * 5, i * 5 + 5));

    }

    return matrix;

}


function findPosition(matrix, char) {

    for (let row = 0; row < 5; row++) {

        for (let col = 0; col < 5; col++) {

            if (matrix[row][col] === char) {
                return [row, col];
            }

        }

    }

}


function prepareText(text) {

    text = text
        .toUpperCase()
        .replace(/J/g, "I")
        .replace(/[^A-Z]/g, "");

    let result = "";

    for (let i = 0; i < text.length; i++) {

        let first = text[i];
        let second = text[i + 1];

        if (!second) {

            result += first + "X";
            break;

        }

        if (first === second) {

            result += first + "X";

        } else {

            result += first + second;
            i++;

        }

    }

    return result;

}


function transformPair(matrix, first, second, direction) {

    let [row1, col1] = findPosition(matrix, first);
    let [row2, col2] = findPosition(matrix, second);

    if (row1 === row2) {

        col1 = (col1 + direction + 5) % 5;
        col2 = (col2 + direction + 5) % 5;

        return matrix[row1][col1] + matrix[row2][col2];

    }

    if (col1 === col2) {

        row1 = (row1 + direction + 5) % 5;
        row2 = (row2 + direction + 5) % 5;

        return matrix[row1][col1] + matrix[row2][col2];

    }

    return matrix[row1][col2] + matrix[row2][col1];

}


function playfairEncrypt(text, key) {

    let matrix = createMatrix(key);
    let preparedText = prepareText(text);

    let result = "";

    for (let i = 0; i < preparedText.length; i += 2) {

        let first = preparedText[i];
        let second = preparedText[i + 1];

        result += transformPair(
            matrix,
            first,
            second,
            1
        );

    }

    return result;

}


function playfairDecrypt(text, key) {

    let matrix = createMatrix(key);

    text = text
        .toUpperCase()
        .replace(/J/g, "I")
        .replace(/[^A-Z]/g, "");

    let result = "";

    for (let i = 0; i < text.length; i += 2) {

        let first = text[i];
        let second = text[i + 1];

        if (!second) {
            break;
        }

        result += transformPair(
            matrix,
            first,
            second,
            -1
        );

    }

    return result;

}

export {
    playfairEncrypt,
    playfairDecrypt
};