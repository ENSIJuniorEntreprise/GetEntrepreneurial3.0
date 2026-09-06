// backend/seed/createAdmin.js
//
// Crée (ou met à jour le mot de passe d') un compte Admin unique.
// Usage : node seed/createAdmin.js <email> <motDePasse>

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const connectDB = require('../config/db');
const Admin = require('../models/Admin');

const run = async () => {
  const [, , email, password] = process.argv;

  if (!email || !password) {
    console.error('Usage : node seed/createAdmin.js <email> <motDePasse>');
    process.exit(1);
  }

  await connectDB();

  let admin = await Admin.findOne({ email: email.toLowerCase().trim() });

  if (admin) {
    admin.password = password;
    await admin.save();
    console.log(`Mot de passe mis à jour pour l'admin ${admin.email}`);
  } else {
    admin = await Admin.create({ email: email.toLowerCase().trim(), password });
    console.log(`Admin créé : ${admin.email}`);
  }

  process.exit(0);
};

run().catch((error) => {
  console.error('Échec de la création de l\'admin :', error);
  process.exit(1);
});
