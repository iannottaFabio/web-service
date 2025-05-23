import express from "express";
import crypto from "crypto";

const router = express.Router()
router.use(express.json())

let passCount = 0

router.get('/generate', (req, res) => {
    const length = parseInt(req.query.length) || 12;
    const base = req.query.base
    const useUppercase = req.query.uppercase === 'true';
    const useDigits = req.query.digits === 'true';
    const useSpecialChars = req.query.special_chars === 'true';
    const password = generatePassword(base, length, useUppercase, useDigits, useSpecialChars);
    res.json({ password });
});



router.post('/validate', (req, res) => {
    if (!req.body || !req.body.password) {
      return res.status(400).json({ error: "La password non è stata fornita" });
    }
  
    const password = req.body.password;
    const problems = validatePassword(password).problems;
  
    res.json({
      password,
      validation: problems === null,
      ...(problems && { problems }),
      strength: validatePassword(password).strength
    });
  });

function generatePassword(base = "passwdGen" + passCount++, length = 12, useUppercase = true, useDigits = true, useSpecialChars = true) {
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    if (useUppercase)   characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useDigits)  characters += '0123456789';
    if (useSpecialChars)    characters += '!@#$%^&*()-_=+[]{}|;:,.<>?';
    let password = base;
    for (let i = 0; i < length; i++) {
        const randomChar = characters.charAt(crypto.randomInt(0, characters.length));
        password += randomChar;
    }
    return password;
}

function validatePassword(pass) {
    let strength = 4
    const problems = [];
    if (pass.length < 10) {
      problems.push("Password troppo corta.");
      strength--
    }
    if (!/\d/.test(pass)) {
      problems.push("Manca un numero.");
      strength--
    }
    if (!/[A-Z]/.test(pass)) {
      problems.push("Manca una maiuscola.");
      strength--
    }
    if (!/[!@#$%^&*()\[\]{}\-_+=|;:,.<>?]/.test(pass)) {
      problems.push("Manca un carattere speciale.");
      strength--
    }
    switch(strength) {
      case 0:
        strength = "MOLTO debole"
        break;
      case 1:
        strength = "debole"
        break;
      case 2:
        strength = "buona"
        break;
      case 3:
        strength = "MOLTO buona"
        break;
      case 4:
        strength = "ottimale"
        break;
    }
    return {
      problems: problems.length ? problems : null,
      strength: strength
    }
  }


  export default router