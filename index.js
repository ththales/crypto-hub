import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Ciphers
import caesarCipher from "./algorithms/ciphers/caesar.js"; // Caesar Cipher
import { vigenereEncrypt, vigenereDecrypt } from "./algorithms/ciphers/vigenere.js"; // Vigenère Cipher
import rot13 from "./algorithms/ciphers/rot13.js"; // Rot13 Cipher
import playfair from "./algorithms/ciphers/playfair.js"; // Playfair Cipher

// Cryptography
import { aesEncrypt, aesDecrypt } from "./algorithms/crypto/aes.js"; // AES
import { desEncrypt, desDecrypt } from "./algorithms/crypto/des.js"; // DES
import { tripleDesEncrypt, tripleDesDecrypt } from "./algorithms/crypto/3des.js"; // 3DES
import { chacha20Encrypt, chacha20Decrypt } from "./algorithms/crypto/chacha20.js"; // ChaCha20
// RSA
import {
    rsaEncrypt,
    rsaDecrypt,
    getPublicKey
} from "./algorithms/crypto/rsa.js";
import { arabicaEncrypt, arabicaDecrypt } from "./algorithms/custom/arabica.js"; // ARABICA-2RS
import { chinzoEncrypt, chinzoDecrypt} from "./algorithms/custom/chinzo.js"; // CHINZO-72C
import { korexEncrypt, korexDecrypt} from "./algorithms/custom/korex.js"; // KOREX-3S
import { japooEncrypt, japooDecrypt } from "./algorithms/custom/japoo.js"; // JAPOO-C2S
import { hindiaEncrypt, hindiaDecrypt} from "./algorithms/custom/hindia.js"; //HINDIA-4X


const app = express();
const port = 8080;
const __dirname = dirname(fileURLToPath(import.meta.url));

let currentYear = new Date().getFullYear();

let ciphers = [
    {
        name: "Caesar Cipher",
        description: "A substitution cipher based on shifting letters.",
        path: "/cipher/caesar"
    },
    {
        name: "Vigenère Cipher",
        description: "A polyalphabetic substitution cipher.",
        path: "/cipher/vigenere"
    },
    {
        name: "Rot13 Cipher",
        description: "A substitution cipher that shifts letters by 13 positions.",
        path: "/cipher/rot13"
    },
    {
        name: "Playfair Cipher",
        description: "A digraph substitution cipher that encrypts pairs of letters.",
        path: "/cipher/playfair"
    }
];

let cryptography = [
    {
        name: "AES",
        description: "A symmetric block cipher widely used for secure data encryption.",
        type: "symmetric",
        path: "/crypto/aes"
    },
    {
        name: "DES",
        description: "A symmetric block cipher that encrypts data using a 56-bit key.",
        type: "symmetric",
        path: "/crypto/des"
    },
    {
        name: "3DES",
        description: "A symmetric encryption algorithm that applies DES three times.",
        type: "symmetric",
        path: "/crypto/3des"
    },
    {
        name: "ChaCha20",
        description: "A modern symmetric stream cipher designed for high performance and security.",
        type: "symmetric",
        path: "/crypto/chacha20"
    },
    {
        name: "RSA",
        description: "An asymmetric cryptographic algorithm based on the difficulty of factoring large integers.",
        type: "asymmetric",
        path: "/crypto/rsa"
    }

];

let custom = [
    {
        name: "ARABICA-2RS",
        description: "A custom substitution cipher that encrypts text using Arabic characters.",
        type: "custom",
        path: "/custom/arabica"
    },
    {
        name: "HINDIA-4X",
        description: "A custom substitution cipher that encrypts text using Hindi Devanagari characters.",
        type: "custom",
        path: "/custom/hindia"
    },
    {
        name: "JAPOO-C2S",
        description: "A custom substitution cipher that encrypts text using Japanese Hiragana characters.",
        type: "custom",
        path: "/custom/japoo"
    },
    {
        name: "CHINZO-72C",
        description: "A custom substitution cipher that encrypts text using Chinese characters.",
        type: "custom",
        path: "/custom/chinzo"
    },
    {
        name: "KOREX-3S",
        description: "A custom substitution cipher that encrypts text using Korean Hangul characters.",
        type: "custom",
        path: "/custom/korex"
    }
];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// KOREX-3S Encryption
app.post("/korex", (req, res) => {
    let values = req.body;
    let text = values.text;
    let method = values.action;

    let changedText = text;

    if(text) {
        if(method === "encrypt") {
            changedText = korexEncrypt(text);
        } else {
            changedText = korexDecrypt(text);
        }
    } else {
        changedText = "";
    }

    res.render(
        "./custom/korex.ejs",
        {
            text: changedText,
            year: currentYear
        }
    );
});
app.get("/custom/korex", (req, res) => {
    res.render(
        "./custom/korex.ejs",
        {
            text: "",
            year: currentYear
        }

    );
});

// CHINZO-72C Encryption
app.post("/chinzo", (req, res) => {
    let values = req.body;
    let text = values.text;
    let method = values.action;

    let changedText = text;

    if(text) {
        if(method === "encrypt") {
            changedText = chinzoEncrypt(text);
        } else {
            changedText = chinzoDecrypt(text);
        }
    } else {
        changedText = "";
    }

    res.render(
        "./custom/chinzo.ejs",
        {
            text: changedText,
            year: currentYear
        }
    );
});
app.get("/custom/chinzo", (req, res) => {
    res.render(
        "./custom/chinzo.ejs",
        {
            text: "",
            year: currentYear
        }

    );
});

// JAPOO-C2S Encryption
app.post("/japoo", (req, res) => {
    let values = req.body;
    let text = values.text;
    let method = values.action;

    let changedText = text;

    if(text) {
        if(method === "encrypt") {
            changedText = japooEncrypt(text);
        } else {
            changedText = japooDecrypt(text);
        }
    } else {
        changedText = "";
    }

    res.render(
        "./custom/japoo.ejs",
        {
            text: changedText,
            year: currentYear
        }
    );
});
app.get("/custom/japoo", (req, res) => {
    res.render(
        "./custom/japoo.ejs",
        {
            text: "",
            year: currentYear
        }

    );
});

// HINDIA-4X Encryption
app.post("/hindia", (req, res) => {
    let values = req.body;
    let text = values.text;
    let method = values.action;

    let changedText = text;

    if(text) {
        if(method === "encrypt") {
            changedText = hindiaEncrypt(text);
        } else {
            changedText = hindiaDecrypt(text);
        }
    } else {
        changedText = "";
    }

    res.render(
        "./custom/hindia.ejs",
        {
            text: changedText,
            year: currentYear
        }
    );
});
app.get("/custom/hindia", (req, res) => {
    res.render(
        "./custom/hindia.ejs",
        {
            text: "",
            year: currentYear
        }

    );
});

// ARABICA-2RS Encryption
app.post("/arabica", (req, res) => {
    let values = req.body;
    let text = values.text;
    let method = values.action;

    let changedText = text;

    if(text) {
        if(method === "encrypt") {
            changedText = arabicaEncrypt(text);
        } else {
            changedText = arabicaDecrypt(text);
        }
    } else {
        changedText = "";
    }

    res.render(
        "./custom/arabica.ejs",
        {
            text: changedText,
            year: currentYear
        }
    );
});
app.get("/custom/arabica", (req, res) => {
    res.render(
        "./custom/arabica.ejs",
        {
            text: "",
            year: currentYear
        }

    );
});


// RSA Encryption
app.post("/rsa", (req, res) => {
    let text = req.body.text || "";
    let method = req.body.action || "";

    let changedText = text;

    try {
        if (text) {
            if (method === "encrypt") {
                changedText = rsaEncrypt(text);
            } else if (method === "decrypt") {
                changedText = rsaDecrypt(text);
            }
        }
    } catch (error) {
        changedText = "";
    }

    res.render(
        "./crypto/rsa.ejs",
        {
            text: changedText,
            publicKey: getPublicKey(),
            year: currentYear
        }
    );

});

app.get("/crypto/rsa", (req, res) => {

    res.render(
        "./crypto/rsa.ejs",
        {
            text: "",
            publicKey: getPublicKey(),
            year: currentYear
        }
    );

});

// ChaCha20 Encryption
app.post("/chacha20", (req, res) => {
    let values = req.body;
    let text = values.text;
    let key = values.key;
    let method = values.action;

    let changedText = text;

    if(key) {
        if(method === "encrypt") {
            changedText = chacha20Encrypt(text, key);
        } else {
            changedText = chacha20Decrypt(text, key);
        }
    } else {
        key = "";
    }

    res.render(
        "./crypto/chacha20.ejs",
        {
            text: changedText,
            key: key,
            year: currentYear
        }
    );
});
app.get("/crypto/chacha20", (req, res) => {
    res.render(
        "./crypto/chacha20.ejs",
        {
            text: "",
            key: "",
            year: currentYear
        }
    );
});

// 3DES Encryption
app.post("/3des", (req, res) => {
    let values = req.body;
    let text = values.text;
    let key = values.key;
    let method = values.action;

    let changedText = text;

    if(key) {
        if(method === "encrypt") {
            changedText = tripleDesEncrypt(text, key);
        } else {
            changedText = tripleDesDecrypt(text, key);
        }
    } else {
        key = "";
    }

    res.render(
        "./crypto/3des.ejs",
        {
            text: changedText,
            key: key,
            year: currentYear
        }
    );
});
app.get("/crypto/3des", (req, res) => {
    res.render(
        "./crypto/3des.ejs",
        {
            text: "",
            key: "",
            year: currentYear
        }
    );
});

// DES Encryption
app.post("/des", (req, res) => {
    let values = req.body;
    let text = values.text;
    let key = values.key;
    let method = values.action;

    let changedText = text;

    if(key) {
        if(method === "encrypt") {
            changedText = desEncrypt(text, key);
        } else {
            changedText = desDecrypt(text, key);
        }
    } else {
        key = "";
    }

    res.render(
        "./crypto/des.ejs",
        {
            text: changedText,
            key: key,
            year: currentYear
        }
    );
});
app.get("/crypto/des", (req, res) => {
    res.render(
        "./crypto/des.ejs",
        {
            text: "",
            key: "",
            year: currentYear
        }
    );
});

// AES Encryption
app.post("/aes", (req, res) => {
    let values = req.body;
    let text = values.text;
    let key = values.key;
    let method = values.action;

    let changedText = text;

    if(key) {
        if(method === "encrypt") {
            changedText = aesEncrypt(text, key);
        } else {
            changedText = aesDecrypt(text, key);
        }
    } else {
        key = "";
    }

    res.render(
        "./crypto/aes.ejs",
        {
            text: changedText,
            key: key,
            year: currentYear
        }
    );
});
app.get("/crypto/aes", (req, res) => {
    res.render(
        "./crypto/aes.ejs",
        {
            text: "",
            key: "",
            year: currentYear
        }
    );
});

// Playfair Cipher
app.post("/playfair", (req, res) => {
    let values = req.body;

    let text = values.text;
    let key = values.key;
    let method = values.action;

    let changedText = text;

    if (text && key) {
        changedText = playfair(text, key);
    } else {
        if (!text) {
            text = "";
        }

        if (!key) {
            key = "";
        }

        changedText = "";
    }

    res.render(
        "./cipher/playfair.ejs",
        {
            text: changedText,
            key: key,
            year: currentYear
        }
    );
});
app.get("/cipher/playfair", (req, res) => {
    res.render(
        "./cipher/playfair.ejs",
        {
            text: "",
            key: "",
            year: currentYear
        }
    );
});


// Rot13 Cipher
app.post("/rot13", (req, res) => {
    let values = req.body;
    let text = values.text;
    let method = values.action;

    var changedText = text;

    if(text) {
        changedText = rot13(text);
    } else {
        changedText = "";
    }

    res.render(
        "./cipher/rot13.ejs",
        {
            text: changedText,
            year: currentYear
        }
    );
});
app.get("/cipher/rot13", (req, res) => {
    res.render(
        "./cipher/rot13.ejs",
        {
            text: "",
            year: currentYear
        }
    );
});

// Vigenère Cipher
app.post("/vigenere", (req, res) => {
    let values = req.body;
    let text = values.text;
    let key = values.key;
    let method = values.action;

    var changedText = text;

    if(key) {
        if(method === "encrypt") {
            changedText = vigenereEncrypt(text, key);
        } else {
            changedText = vigenereDecrypt(text, key);
        }
    } else {
        key = "";
    }

    res.render(
        "./cipher/vigenere.ejs",
        {
            text: changedText,
            key: key,
            year: currentYear
        }
    );
});
app.get("/cipher/vigenere", (req, res) => {
    res.render(
        "./cipher/vigenere.ejs",
        {
            text: "",
            key: "",
            year: currentYear
        }
    );
});

// Caesar Cipher
app.post("/caesar", (req, res) => {
    let values = req.body
    let text = values.text;
    let offset = parseInt(values.offset);
    let method = values.action;

    var changedText = text;

    if(offset) {
        if(method === "encrypt") {
            changedText = caesarCipher(text, offset);
        } else {
            changedText = caesarCipher(text, -offset);
        }
    }

    res.render(
        "./cipher/caesar.ejs",
        {
            text: changedText,
            year: currentYear
        }
    );
});
app.get("/cipher/caesar", (req, res) => {
    res.render(
        "./cipher/caesar.ejs",
        {
            text: "",
            year: currentYear
        }
    );
});

app.get("/home", (req, res) => {
    res.render(
        "index.ejs",
        {
            ciphers: ciphers,
            cryptography: cryptography,
            custom: custom,
            year: currentYear 
        }
    );
})

app.get("/", (req, res) => {
    res.redirect("/home");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});