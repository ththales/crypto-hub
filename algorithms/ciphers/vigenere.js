function vigenereEncrypt(text, key) {
    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (/[a-zA-Z]/.test(char)) {
            let charCode = char.toUpperCase().charCodeAt(0) - 65;
            let keyCode = key.toUpperCase().charCodeAt(keyIndex % key.length) - 65;

            let encryptedCode = (charCode + keyCode) % 26;

            let encryptedChar = String.fromCharCode(encryptedCode + 65);

            if (char === char.toLowerCase()) {
                encryptedChar = encryptedChar.toLowerCase();
            }

            result += encryptedChar;
            keyIndex++;
        } else {
            result += char;
        }
    }

    return result;
}

function vigenereDecrypt(text, key) {
    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (/[a-zA-Z]/.test(char)) {
            let charCode = char.toUpperCase().charCodeAt(0) - 65;
            let keyCode = key.toUpperCase().charCodeAt(keyIndex % key.length) - 65;

            let decryptedCode = (charCode - keyCode + 26) % 26;

            let decryptedChar = String.fromCharCode(decryptedCode + 65);

            if (char === char.toLowerCase()) {
                decryptedChar = decryptedChar.toLowerCase();
            }

            result += decryptedChar;
            keyIndex++;
        } else {
            result += char;
        }
    }

    return result;
}

export {
    vigenereEncrypt,
    vigenereDecrypt
};