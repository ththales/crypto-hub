# 🔐 Crypto-Hub

> A web-based cryptography hub for exploring, testing and learning about classical ciphers and cryptographic algorithms.

**Crypto-Hub** is a web application developed with **Node.js, Express and EJS** that provides an interactive collection of cryptographic methods.

The project allows users to select a cipher, enter text and perform **encryption and decryption** directly through a web interface.

---

## 🔐 Available Algorithms

The project contains several cryptographic algorithms, including:

| Cipher | Type |
| --- | --- |
| Caesar Cipher | Cipher |
| Vigenère Cipher | Cipher |
| ROT13 | Cipher |
| Playfair | Cipher |
| AES | Encryption |
| DES | Encryption |
| 3DES | Encryption |
| ChaCha20 | Encryption |
| RSA | Encryption |
| ARABICA-2RS | Encryption |
| HINDIA-4X | Encryption |
| JAPOO-C2S | Encryption |
| CHINZO-72C | Encryption |
| KOREX-3S | Encryption |

More algorithms can be added in the future

---

## 🧩 Project Structure

```text
crypto-hub/
│
├── algorithms/
│   ├── ciphers/
│   │   ├── caesar.js
│   │   ├── vigenere.js
│   │   ├── rot13.js
│   │   └── playfair.js
|   |
|   ├── crypto/
|   |   ├── 3des.js
|   |   ├── aes.js
|   |   ├── chacha20.js
|   |   ├── des.js
│   │   └── rsa.js
│   │
│   └── custom/
│       ├── arabica.js
│       ├── chinzo.js
│       ├── hindia.js
│       ├── japoo.js
│       └── korex.js
│
├── public/
│   ├── img/
│   └── styles/
│       ├── forms/
│           └── fieds.css
│       ├── footer.css
│       ├── header.css
│       └── index.css
|
├── routes/
│   ├── cipherRoutes.js
│   ├── cryptoRoutes.js
│   └── customRoutes.js
|
├── views/
│   ├── cipher/
│   │   ├── caesar.ejs
│   │   ├── playfair.ejs
│   │   ├── rot13.ejs
|   |   └── vigenere.ejs
│   │
│   ├── crypto/
│   │   ├── aes.ejs
│   │   ├── des.ejs
│   │   ├── 3des.ejs
│   │   ├── chacha20.ejs
│   │   └── rsa.ejs
│   │
│   ├── custom/
│   │   ├── arabica.ejs
│   │   ├── chinzo.ejs
│   │   ├── hindia.ejs
│   │   ├── japoo.ejs
│   │   └── korex.ejs
│   │
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   │
│   └── index.ejs
│
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

> The exact structure may change as new algorithms and features are added.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/crypto-hub.git
```

### 2. Enter the project directory

```bash
cd crypto-hub
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the application

```bash
node app.js
```

The server should start on:

```text
http://localhost:8080
```

---

---

## 🎯 Project Goals

The main goals of Crypto-Hub are:

* [x] Create a web interface for cryptographic algorithms
* [x] Implement encryption and decryption
* [x] Separate algorithms into independent modules
* [x] Use Express.js for server-side routing
* [x] Use EJS for dynamic pages
* [x] Create reusable views and partials
* [ ] Expand the cipher collection
* [ ] Improve input validation
* [ ] Add more cryptographic categories
* [ ] Improve accessibility
* [x] Improve mobile responsiveness
* [ ] Add additional educational information for each algorithm

---

## 👨‍💻 Author

Developed by **Thales**, a CS student

* Computer Science
* Software Development
* Web Development
* Algorithms
* Cryptography
* Cybersecurity

---