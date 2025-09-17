// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// --- Définition des routes de l'API ---
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/newsletter', require('./routes/newsletterRoutes'));
app.use('/api/inscriptions', require('./routes/inscriptionRoutes'));

// NOUVELLE LIGNE : Ajouter la route pour les statistiques du dashboard
app.use('/api/stats', require('./routes/dashboardRoutes'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Le serveur est démarré en mode ${process.env.NODE_ENV} sur le port ${PORT}`);
});