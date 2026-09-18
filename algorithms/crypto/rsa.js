import NodeRSA from "node-rsa";

const key = new NodeRSA({ b: 2048 });

key.setOptions({
    encryptionScheme: "pkcs1_oaep"
});

function rsaEncrypt(text) {
    return key.encrypt(text, "base64");
}

function rsaDecrypt(text) {
    return key.decrypt(text, "utf8");
}

function getPublicKey() {
    return key.exportKey("public");
}

function getPrivateKey() {
    return key.exportKey("private");
}

export {
    rsaEncrypt,
    rsaDecrypt,
    getPublicKey,
    getPrivateKey
};