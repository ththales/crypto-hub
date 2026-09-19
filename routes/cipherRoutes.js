import express from "express";

// Ciphers
import caesarCipher from "../algorithms/ciphers/caesar.js"; // Caesar Cipher
import { vigenereEncrypt, vigenereDecrypt } from "../algorithms/ciphers/vigenere.js"; // Vigenère Cipher
import rot13 from "../algorithms/ciphers/rot13.js"; // Rot13 Cipher
import { playfairEncrypt, playfairDecrypt } from "../algorithms/ciphers/playfair.js"; // Playfair Cipher

const router = express.Router();

let currentYear = new Date().getFullYear();

// Caesar
router.post("/caesar", (req, res) => {
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
router.get("/caesar", (req, res) => {
    res.render(
        "./cipher/caesar.ejs",
        {
            text: "",
            year: currentYear
        }
    );
});

// Vigenère
router.post("/vigenere", (req, res) => {
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
router.get("/vigenere", (req, res) => {
    res.render(
        "./cipher/vigenere.ejs",
        {
            text: "",
            key: "",
            year: currentYear
        }
    );
});

// Rot13
router.post("/rot13", (req, res) => {
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
router.get("/rot13", (req, res) => {
    res.render(
        "./cipher/rot13.ejs",
        {
            text: "",
            year: currentYear
        }
    );
});

// Playfair
router.post("/playfair", (req, res) => {
    let values = req.body;

    let text = values.text;
    let key = values.key;
    let method = values.action;

    let changedText = text;

    if (text && key) {
        if(method === "encrypt") {
            changedText = playfairEncrypt(text, key);
        } else {
            changedText = playfairDecrypt(text, key);
        }
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
router.get("/playfair", (req, res) => {
    res.render(
        "./cipher/playfair.ejs",
        {
            text: "",
            key: "",
            year: currentYear
        }
    );
});

export default router;