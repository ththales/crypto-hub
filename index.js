import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";


const app = express();
const port = 8080;
const __dirname = dirname(fileURLToPath(import.meta.url));

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
    }
];

// Cipher Functions
/// Caesar Cipher
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


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/caesar", (req, res) => {
    let currentYear = new Date().getFullYear();

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

    console.log(values);
});

app.get("/ciphers/caesar", (req, res) => {
    let currentYear = new Date().getFullYear();

    res.render(
        "./ciphers/caesar.ejs",
        {
            text: "",
            year: currentYear
        }
    );
});

app.get("/home", (req, res) => {
    let currentYear = new Date().getFullYear();

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