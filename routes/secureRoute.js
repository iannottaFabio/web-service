import express from 'express';
import crypto from 'crypto';
import axios from 'axios';

const SecureRouter = express.Router();

SecureRouter.post('/breached', async (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: "Password richiesta." });
  }
  const sha1 = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
  const prefix = sha1.substring(0, 5);
  const suffix = sha1.substring(5);

  try {
    const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
    const match = response.data.split('\n').find(line => line.startsWith(suffix));
    const count = match ? parseInt(match.split(':')[1]) : 0;

    res.json({
      password,
      breached: count > 0,
      count,
      message: count > 0
        ? `La password è stata trovata ${count} volte in data breach pubblici.`
        : "La password non risulta compromessa (o molto poco diffusa)."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore durante la verifica con Have I Been Pwned." });
  }
});

export default SecureRouter