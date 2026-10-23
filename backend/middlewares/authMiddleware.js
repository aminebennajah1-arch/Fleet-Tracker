const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format Expected: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Accès refusé. Jeton manquant.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ error: 'Jeton invalide ou expiré.' });
    }
    req.user = decodedUser;
    next();
  });
};