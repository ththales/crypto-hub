const alphabet = [
    "ا", "ب", "ت", "ث", "ج", "ح", "خ",
    "د", "ذ", "ر", "ز", "س", "ش", "ص",
    "ض", "ط", "ظ", "ع", "غ", "ف", "ق",
    "ك", "ل", "م", "ن", "ه", "و", "ي"
];

const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function arabicaEncrypt(text) {
    return [...text.toUpperCase()].map((char, index) => {

        const position = latin.indexOf(char);

        if (position === -1) {
            return char;
        }

        const shifted =
            (position - 2 - index) % alphabet.length;

        return alphabet[(shifted + alphabet.length) % alphabet.length];

    }).join("");
}

function arabicaDecrypt(text) {
    return [...text].map((char, index) => {

        const position = alphabet.indexOf(char);

        if (position === -1) {
            return char;
        }

        const original =
            (position + 2 + index) % alphabet.length;

        return latin[original % latin.length];

    }).join("");
}

export {
    arabicaEncrypt,
    arabicaDecrypt
};