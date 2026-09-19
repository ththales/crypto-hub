const alphabet = [
    "가", "나", "다", "라", "마", "바", "사",
    "아", "자", "차", "카", "타", "파", "하",
    "거", "너", "더", "러", "머", "버", "서",
    "어", "저", "처", "커", "터", "퍼"
];

const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function korexEncrypt(text) {
    return [...text.toUpperCase()].map((char, index) => {

        const position = latin.indexOf(char);

        if (position === -1) {
            return char;
        }

        const shift = 3 + (index % 3);

        return alphabet[(position + shift) % alphabet.length];

    }).join("");
}

function korexDecrypt(text) {
    return [...text].map((char, index) => {

        const position = alphabet.indexOf(char);

        if (position === -1) {
            return char;
        }

        const shift = 3 + (index % 3);

        return latin[
            (position - shift + alphabet.length) % alphabet.length
        ];

    }).join("");
}

export {
    korexEncrypt,
    korexDecrypt
};