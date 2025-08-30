const mongoose = require('mongoose');

const exposantSchema = new mongoose.Schema(
  {
    // Le nom de l'entreprise
    nomEntreprise: {
      type: String,
      required: [true, "Le nom de l'entreprise est obligatoire."],
      trim: true,
    },
    // Le secteur d'activité (ex: Fintech, Healthtech)
    secteurActivite: {
        type: String,
        required: [true, "Le secteur d'activité est obligatoire."],
        trim: true,
    },
    // Le type d'organisation (ex: Startup, PME, Grande entreprise)
    typeOrganisation: {
        type: String,
        required: [true, "Le type d'organisation est obligatoire."],
        trim: true,
    },
    // Le nom complet de la personne de contact
    nomContact: {
      type: String,
      required: [true, 'Le nom du contact est obligatoire.'],
      trim: true,
    },
    // L'email professionnel du contact
    emailContact: {
      type: String,
      required: [true, "L'adresse email du contact est obligatoire."],
      // Important: l'email doit être unique pour éviter les doublons d'inscription
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Veuillez entrer une adresse email valide.",
      ],
    },
    // Le numéro de téléphone du contact
    telephone: {
      type: String,
      required: [true, 'Le numéro de téléphone est obligatoire.'],
      trim: true,
    },
    // Le site web de l'entreprise (non obligatoire)
    siteWeb: {
      type: String,
      required: false,
      trim: true,
    },
    // Description de l'activité et des innovations
    description: {
        type: String,
        required: [true, "Une description de l'activité est requise."],
        trim: true,
    },
    // Acceptation des termes et conditions
    accepteTermes: {
        type: Boolean,
        // On peut s'assurer que cette case soit cochée en la rendant "required"
        // Cependant, la validation se fait souvent mieux côté frontend.
        // Côté backend, on peut juste vérifier si la valeur est "true".
        default: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Exposant', exposantSchema);