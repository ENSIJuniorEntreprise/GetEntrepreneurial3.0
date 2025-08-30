const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // On essaie de se connecter à la base de données avec l'URL de notre fichier .env
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Si la connexion réussit, on affiche un message dans la console
    console.log(`MongoDB Connecté: ${conn.connection.host}`);
  } catch (error) {
    // Si la connexion échoue, on affiche l'erreur et on quitte le processus
    console.error(`Erreur de connexion à la BDD: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;