const alphabet = [
    "天", "地", "人", "山", "水", "火", "木",
    "金", "月", "日", "星", "风", "雨", "云",
    "海", "山", "龙", "虎", "鸟", "花", "心",
    "光", "影", "梦", "夜", "空"
];

const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function chinzoEncrypt(text) {
    return [...text.toUpperCase()].map((char, index) => {

        const position = latin.indexOf(char);

        if (position === -1) {
            return char;
        }

        const shift = 7 + (index % 2);

        return alphabet[(position + shift) % alphabet.length];

    }).join("");
}

function chinzoDecrypt(text) {
    return [...text].map((char, index) => {

        const position = alphabet.indexOf(char);

        if (position === -1) {
            return char;
        }

        const shift = 7 + (index % 2);

        return latin[
            (position - shift + alphabet.length) % alphabet.length
        ];

    }).join("");
}

export {
    chinzoEncrypt,
    chinzoDecrypt
};