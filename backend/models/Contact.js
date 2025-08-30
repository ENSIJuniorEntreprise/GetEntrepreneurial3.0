const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    // Le prénom de la personne
    prenom: {
      type: String,
      required: [true, 'Le prénom est obligatoire.'],
      trim: true,
    },
    // Le nom de famille de la personne
    nom: {
        type: String,
        required: [true, 'Le nom est obligatoire.'],
        trim: true,
    },
    // L'adresse email de la personne
    email: {
      type: String,
      required: [true, "L'adresse email est obligatoire."],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Veuillez entrer une adresse email valide.",
      ],
    },
    // Le sujet du message
    sujet: {
      type: String,
      required: [true, 'Le sujet est obligatoire.'],
      trim: true,
    },
    // Le contenu du message
    message: {
      type: String,
      required: [true, 'Le message ne peut pas être vide.'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Rappel : pas de 'unique: true' sur l'email ici, car une même personne
// peut légitimement envoyer plusieurs messages.

module.exports = mongoose.model('Contact', contactSchema);