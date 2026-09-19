import express from "express";

// Crypto
import { aesEncrypt, aesDecrypt } from "../algorithms/crypto/aes.js"; // AES
import { desEncrypt, desDecrypt } from "../algorithms/crypto/des.js"; // DES
import { tripleDesEncrypt, tripleDesDecrypt } from "../algorithms/crypto/3des.js"; // 3DES
import { chacha20Encrypt, chacha20Decrypt } from "../algorithms/crypto/chacha20.js"; // ChaCha20
import { rsaEncrypt, rsaDecrypt, getPublicKey } from "../algorithms/crypto/rsa.js"; // RSA

const router = express.Router();

let currentYear = new Date().getFullYear();

// AES
router.post("/aes", (req, res) => {
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
router.get("/aes", (req, res) => {
    res.render(
        "./crypto/aes.ejs",
        {
            text: "",
            key: "",
            year: currentYear
        }
    );
});

// DES
router.post("/des", (req, res) => {
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
router.get("/des", (req, res) => {
    res.render(
        "./crypto/des.ejs",
        {
            text: "",
            key: "",
            year: currentYear
        }
    );
});

// 3DES
router.post("/3des", (req, res) => {
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
router.get("/3des", (req, res) => {
    res.render(
        "./crypto/3des.ejs",
        {
            text: "",
            key: "",
            year: currentYear
        }
    );
});

// ChaCha20
router.post("/chacha20", (req, res) => {
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
router.get("/chacha20", (req, res) => {
    res.render(
        "./crypto/chacha20.ejs",
        {
            text: "",
            key: "",
            year: currentYear
        }
    );
});

// RSA
router.post("/rsa", (req, res) => {
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

router.get("/rsa", (req, res) => {

    res.render(
        "./crypto/rsa.ejs",
        {
            text: "",
            publicKey: getPublicKey(),
            year: currentYear
        }
    );

});

export default router;