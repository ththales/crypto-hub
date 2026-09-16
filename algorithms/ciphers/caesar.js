function caesarCipher(text, offset) {
    let result = "";

    for (let i = 0; i < text.length; i++) {

        let char = text[i];

        if (char >= "A" && char <= "Z") {
            char = String.fromCharCode(
                ((char.charCodeAt(0) - 65 + offset) % 26 + 26) % 26 + 65
            );
        }

        else if (char >= "a" && char <= "z") {
            char = String.fromCharCode(
                ((char.charCodeAt(0) - 97 + offset) % 26 + 26) % 26 + 97
            );
        }

        result += char;
    }

    return result;
}

export default caesarCipher;