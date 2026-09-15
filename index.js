import express from "express";

const app = express();
const port = 8080;

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

app.use(express.static("public"));

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