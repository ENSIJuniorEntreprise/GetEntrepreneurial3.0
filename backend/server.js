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

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/content/settings', require('./routes/eventSettingsRoutes'));
app.use('/api/content/agenda', require('./routes/agendaRoutes'));
app.use('/api/content/panels', require('./routes/panelRoutes'));
app.use('/api/content/sponsors', require('./routes/sponsorRoutes'));
app.use('/api/content/site', require('./routes/siteContentRoutes'));
app.use('/api/content/articles', require('./routes/articleRoutes'));
app.use('/api/content/axes', require('./routes/axisRoutes'));
app.use('/api/content/speakers', require('./routes/speakerRoutes'));
app.use('/api/content/editions', require('./routes/editionRoutes'));
app.use('/api/content/form-options', require('./routes/formOptionsRoutes'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Le serveur est démarré en mode ${process.env.NODE_ENV} sur le port ${PORT}`);
});