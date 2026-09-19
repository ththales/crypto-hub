import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Rotas
import cipherRoutes from "./routes/cipherRoutes.js";
import cryptoRoutes from "./routes/cryptoRoutes.js";
import customRoutes from "./routes/customRoutes.js";

const app = express();
const port = 8080;
const __dirname = dirname(fileURLToPath(import.meta.url));

let currentYear = new Date().getFullYear();

let ciphers = [
    {
        name: "Caesar",
        description: "A substitution cipher based on shifting letters.",
        path: "/cipher/caesar"
    },
    {
        name: "Vigenère",
        description: "A polyalphabetic substitution cipher.",
        path: "/cipher/vigenere"
    },
    {
        name: "Rot13",
        description: "A substitution cipher that shifts letters by 13 positions.",
        path: "/cipher/rot13"
    },
    {
        name: "Playfair",
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

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/cipher", cipherRoutes);
app.use("/crypto", cryptoRoutes);
app.use("/custom", customRoutes);

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