import crypto from "node:crypto";

function chacha20Encrypt(text, key) {
    const keyBuffer = crypto.createHash("sha256").update(key).digest();
    const nonce = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(
        "chacha20",
        keyBuffer,
        nonce
    );

    const encrypted = Buffer.concat([
        cipher.update(text, "utf8"),
        cipher.final()
    ]);

    return `${nonce.toString("hex")}:${encrypted.toString("hex")}`;
}

function chacha20Decrypt(text, key) {
    const [nonceHex, encryptedHex] = text.split(":");

    const keyBuffer = crypto.createHash("sha256").update(key).digest();
    const nonce = Buffer.from(nonceHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");

    const decipher = crypto.createDecipheriv(
        "chacha20",
        keyBuffer,
        nonce
    );

    const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final()
    ]);

    return decrypted.toString("utf8");
}

export { chacha20Encrypt, chacha20Decrypt };