// backend/controllers/authController.js

const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, { expiresIn: '8h' });
};

/**
 * @desc    Authentifier l'admin et renvoyer un token JWT
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email et mot de passe requis.' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Identifiants invalides.' });
    }

    res.status(200).json({
      success: true,
      token: generateToken(admin._id),
      email: admin.email,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur du serveur lors de la connexion.', error: error.message });
  }
};
