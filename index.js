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

const app = express();
const port = 8080;
const __dirname = dirname(fileURLToPath(import.meta.url));

let currentYear = new Date().getFullYear();

let ciphers = [
    {
        name: "Caesar Cipher",
        description: "A substitution cipher based on shifting letters.",
        path: "/ciphers/caesar"
    },
    {
        name: "Vigenère Cipher",
        description: "A polyalphabetic substitution cipher.",
        path: "/ciphers/vigenere"
    },
    {
        name: "Rot13 Cipher",
        description: "A substitution cipher that shifts letters by 13 positions.",
        path: "/ciphers/rot13"
    },
    {
        name: "Playfair Cipher",
        description: "A digraph substitution cipher that encrypts pairs of letters.",
        path: "/ciphers/playfair"
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

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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
        "./ciphers/playfair.ejs",
        {
            text: changedText,
            key: key,
            year: currentYear
        }
    );
});
app.get("/ciphers/playfair", (req, res) => {
    res.render(
        "./ciphers/playfair.ejs",
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
        "./ciphers/rot13.ejs",
        {
            text: changedText,
            year: currentYear
        }
    );
});
app.get("/ciphers/rot13", (req, res) => {
    res.render(
        "./ciphers/rot13.ejs",
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
        "./ciphers/vigenere.ejs",
        {
            text: changedText,
            key: key,
            year: currentYear
        }
    );
});
app.get("/ciphers/vigenere", (req, res) => {
    res.render(
        "./ciphers/vigenere.ejs",
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
        "./ciphers/caesar.ejs",
        {
            text: changedText,
            year: currentYear
        }
    );
});
app.get("/ciphers/caesar", (req, res) => {
    res.render(
        "./ciphers/caesar.ejs",
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