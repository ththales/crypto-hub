const alphabet = [
    "あ", "か", "さ", "た", "な", "は", "ま",
    "や", "ら", "わ", "い", "き", "し", "ち",
    "に", "ひ", "み", "ゆ", "り", "を", "う",
    "く", "す", "つ", "ぬ", "ふ", "む"
];

const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function japooEncrypt(text) {
    return [...text.toUpperCase()].map((char, index) => {

        const position = latin.indexOf(char);

        if (position === -1) {
            return char;
        }

        const cycle = Math.floor(index / alphabet.length) % 2;

        const shift = cycle === 0 ? 2 : 4;

        return alphabet[(position + shift) % alphabet.length];

    }).join("");
}

function japooDecrypt(text) {
    return [...text].map((char, index) => {

        const position = alphabet.indexOf(char);

        if (position === -1) {
            return char;
        }

        const cycle = Math.floor(index / alphabet.length) % 2;

        const shift = cycle === 0 ? 2 : 4;

        return latin[
            (position - shift + alphabet.length) % alphabet.length
        ];

    }).join("");
}

export {
    japooEncrypt,
    japooDecrypt
};