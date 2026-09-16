import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Cifras
import caesarCipher from "./algorithms/ciphers/caesar.js";
import { vigenereEncrypt, vigenereDecrypt } from "./algorithms/ciphers/vigenere.js";

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
        name: ""
    }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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