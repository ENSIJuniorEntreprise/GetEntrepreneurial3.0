// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

/**
 * Protège une route : exige un JWT valide dans l'en-tête Authorization.
 */
exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Non autorisé, token manquant.' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Non autorisé, admin introuvable.' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Non autorisé, token invalide ou expiré.' });
  }
};
