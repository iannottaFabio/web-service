import express from "express";
import crypto from "crypto"

const app = express()
app.get('/generate-password', (req, res) => {
    const length = parseInt(req.query.length) || 12;  // Default lunghezza 12
    const base = req.query.base
    const useUppercase = req.query.uppercase === 'true';
    const useDigits = req.query.digits === 'true';
    const useSpecialChars = req.query.special_chars === 'true';

    // Genera la password
    const password = generatePassword(base, length, useUppercase, useDigits, useSpecialChars);

    // Risposta in formato JSON
    res.json({ password });
});

// Avvia il server
app.listen(8080, () => {
    console.log(`http://localhost:8080`);
});
// Funzione per generare la password
function generatePassword(base = "", length = 12, useUppercase = true, useDigits = true, useSpecialChars = true) {
    let characters = 'abcdefghijklmnopqrstuvwxyz';  // lettere minuscole

    if (useUppercase) {
        characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';  // aggiungi lettere maiuscole
    }
    if (useDigits) {
        characters += '0123456789';  // aggiungi numeri
    }
    if (useSpecialChars) {
        characters += '!@#$%^&*()-_=+[]{}|;:,.<>?';  // aggiungi caratteri speciali
    }

    let password = base;
    for (let i = 0; i < length; i++) {
        const randomChar = characters.charAt(crypto.randomInt(0, characters.length));
        password += randomChar;
    }

    return password;
}
