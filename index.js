import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Cifras
import caesarCipher from "./algorithms/ciphers/caesar.js";
import { vigenereEncrypt, vigenereDecrypt } from "./algorithms/ciphers/vigenere.js";
import rot13 from "./algorithms/ciphers/rot13.js";
import playfair from "./algorithms/ciphers/playfair.js";


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
        path: "/cryptography/aes"
    },

    {
        name: "DES",
        description: "A symmetric block cipher that encrypts data using a 56-bit key.",
        type: "symmetric",
        path: "/cryptography/des"
    },

    {
        name: "3DES",
        description: "A symmetric encryption algorithm that applies DES three times.",
        type: "symmetric",
        path: "/cryptography/3des"
    },

    {
        name: "ChaCha20",
        description: "A modern symmetric stream cipher designed for high performance and security.",
        type: "symmetric",
        path: "/cryptography/chacha20"
    },

    {
        name: "RSA",
        description: "An asymmetric cryptographic algorithm based on the difficulty of factoring large integers.",
        type: "asymmetric",
        path: "/cryptography/rsa"
    },

    {
        name: "Diffie-Hellman",
        description: "A key exchange algorithm that allows two parties to establish a shared secret.",
        type: "asymmetric",
        path: "/cryptography/diffie-hellman"
    },

    {
        name: "ECC",
        description: "A family of asymmetric cryptographic algorithms based on elliptic curve mathematics.",
        type: "asymmetric",
        path: "/cryptography/ecc"
    }

];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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
    let values = req.body
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
    let values = req.body
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