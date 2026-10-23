const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/hashHelper');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email et mot de passe requis.' });

  try {
    const hashedPassword = await hashPassword(password);
    
    User.create(email, hashedPassword, (err, userId) => {
      if (err) {
        if (err.message.includes('UNIQUE')) return res.status(400).json({ error: 'Email déjà utilisé.' });
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Utilisateur créé !', userId });
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email et mot de passe requis.' });

  User.findByEmail(email, async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Identifiants incorrects.' });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Identifiants incorrects.' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ message: 'Connecté', token, user: { id: user.id, email: user.email } });
  });
};