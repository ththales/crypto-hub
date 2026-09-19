const alphabet = [
    "अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ",
    "ए", "ऐ", "ओ", "औ", "क", "ख", "ग",
    "घ", "ङ", "च", "छ", "ज", "झ", "ञ",
    "ट", "ठ", "ड", "ढ", "ण", "त", "थ"
];

const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function hindiaEncrypt(text) {
    return [...text.toUpperCase()].map((char, index) => {

        const position = latin.indexOf(char);

        if (position === -1) {
            return char;
        }

        const shift = 4 + (index % 4);

        return alphabet[(position + shift) % alphabet.length];

    }).join("");
}

function hindiaDecrypt(text) {
    return [...text].map((char, index) => {

        const position = alphabet.indexOf(char);

        if (position === -1) {
            return char;
        }

        const shift = 4 + (index % 4);

        return latin[
            (position - shift + alphabet.length) % alphabet.length
        ];

    }).join("");
}

export {
    hindiaEncrypt,
    hindiaDecrypt
};