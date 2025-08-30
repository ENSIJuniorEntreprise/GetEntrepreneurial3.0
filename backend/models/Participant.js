const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema(
  {
    prenom: {
      type: String,
      required: [true, 'Le prénom est obligatoire.'],
      trim: true,
    },
    nom: {
      type: String,
      required: [true, 'Le nom est obligatoire.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "L'adresse email est obligatoire."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Veuillez entrer une adresse email valide.",
      ],
    },
    telephone: {
      type: String,
      required: [true, 'Le numéro de téléphone est obligatoire.'],
      trim: true,
    },
    dateDeNaissance: {
      type: Date,
      required: [true, 'La date de naissance est obligatoire.'],
    },
    sexe: {
      type: String,
      required: [true, 'Le sexe est obligatoire.'],
      // 'enum' restreint les valeurs possibles pour ce champ.
      // Assurez-vous que ces valeurs correspondent exactement à celles de votre dropdown.
      enum: ['Homme', 'Femme', 'Autre'], 
    },
    region: {
      type: String,
      required: [true, 'La région est obligatoire.'],
      trim: true,
    },
    statut: {
      type: String,
      required: [true, 'Le statut est obligatoire.'],
      trim: true,
    },
    expertise: {
      type: String,
      required: [true, "Le champ d'expertise est obligatoire."],
      trim: true,
    },
    experience: {
      type: String,
      required: [true, "Le niveau d'expérience est obligatoire."],
      trim: true,
    },
    partageInfos: {
      type: Boolean,
      default: false, // La valeur par défaut est false (non cochée)
    },
  },
  {
    timestamps: true,
  }
);

// Bonus : Un "champ virtuel" pour reconstruire le nom complet si besoin, sans le stocker
participantSchema.virtual('nomComplet').get(function() {
  return this.prenom + ' ' + this.nom;
});

module.exports = mongoose.model('Participant', participantSchema);