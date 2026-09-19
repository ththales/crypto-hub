import NodeRSA from "node-rsa";

function generateKeyPair() {
    const key = new NodeRSA({ b: 2048 });
    key.setOptions({ encryptionScheme: "pkcs1_oaep" });
    return {
        publicKey: key.exportKey("public"),
        privateKey: key.exportKey("private")
    };
}

function rsaEncrypt(text, publicKey) {
    const key = new NodeRSA();
    key.setOptions({ encryptionScheme: "pkcs1_oaep" });
    key.importKey(publicKey, "public");
    return key.encrypt(text, "base64");
}

function rsaDecrypt(text, privateKey) {
    const key = new NodeRSA();
    key.setOptions({ encryptionScheme: "pkcs1_oaep" });
    key.importKey(privateKey, "private");
    return key.decrypt(text, "utf8");
}

export {
    generateKeyPair,
    rsaEncrypt,
    rsaDecrypt
};