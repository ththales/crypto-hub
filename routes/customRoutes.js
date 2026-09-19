import express from "express";

// Custom
import { arabicaEncrypt, arabicaDecrypt } from "../algorithms/custom/arabica.js"; // ARABICA-2RS
import { chinzoEncrypt, chinzoDecrypt} from "../algorithms/custom/chinzo.js"; // CHINZO-72C
import { korexEncrypt, korexDecrypt} from "../algorithms/custom/korex.js"; // KOREX-3S
import { japooEncrypt, japooDecrypt } from "../algorithms/custom/japoo.js"; // JAPOO-C2S
import { hindiaEncrypt, hindiaDecrypt} from "../algorithms/custom/hindia.js"; //HINDIA-4X

const router = express.Router();

let currentYear = new Date().getFullYear();

// ARABICA-2RS
router.post("/arabica", (req, res) => {
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
router.get("/arabica", (req, res) => {
    res.render(
        "./custom/arabica.ejs",
        {
            text: "",
            year: currentYear
        }

    );
});

// HINDIA-4X
router.post("/hindia", (req, res) => {
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
router.get("/hindia", (req, res) => {
    res.render(
        "./custom/hindia.ejs",
        {
            text: "",
            year: currentYear
        }

    );
});

// JAPOO-C2S
router.post("/japoo", (req, res) => {
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
router.get("/japoo", (req, res) => {
    res.render(
        "./custom/japoo.ejs",
        {
            text: "",
            year: currentYear
        }

    );
});

// CHINZO-72C
router.post("/chinzo", (req, res) => {
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
router.get("/chinzo", (req, res) => {
    res.render(
        "./custom/chinzo.ejs",
        {
            text: "",
            year: currentYear
        }

    );
});

// KOREX-3S
router.post("/korex", (req, res) => {
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
router.get("/korex", (req, res) => {
    res.render(
        "./custom/korex.ejs",
        {
            text: "",
            year: currentYear
        }

    );
});

export default router;