// backend/seed/seedEditions.js
//
// Insère les 3 éditions historiques (edition1, edition2, legacy) dans la
// collection Edition, avec leur vrai contenu texte, en corrigeant le bug de
// date copié-collé (edition2 affichait la même date qu'edition1).
//
// Les images locales du frontend sont uploadées vers Cloudinary si les
// identifiants CLOUDINARY_* sont renseignés dans .env ; sinon le champ image
// reste vide et pourra être complété plus tard depuis le dashboard admin.
//
// Usage : node seed/seedEditions.js

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const connectDB = require('../config/db');
const Edition = require('../models/Edition');
const { cloudinaryConfigured, uploadLocalImage: uploadLocalImageBase } = require('./seedUtils');

const uploadLocalImage = (filename) => uploadLocalImageBase(filename, 'editions');

const buildImage = async (filename, alt = '') => {
  const { url, publicId } = await uploadLocalImage(filename);
  return { image: url, imagePublicId: publicId, alt };
};

const buildEditions = async () => [
  {
    order: 0,
    slug: 'edition1',
    editionLabel: '1ère édition',
    year: 2024,
    dateVenueText: "24 janvier 2024, à l'UTICA",
    tagline: 'Innovation et Entrepreneuriat pour un Avenir Durable',
    ...(await buildImage('047comp.png').then(({ image, imagePublicId }) => ({ heroImage: image, heroImagePublicId: imagePublicId }))),
    stats: [
      { value: '11', label: 'Sponsors' },
      { value: '86%', label: 'Taux de Satisfaction' },
      { value: '500', label: 'Participants' },
    ],
    gallery: await Promise.all([
      buildImage('003.png', 'Temps fort 1'),
      buildImage('015.png', 'Temps fort 2'),
      buildImage('296.png', 'Temps fort 3'),
      buildImage('167.png', 'Temps fort 4'),
      buildImage('073.png', 'Temps fort 5'),
    ]),
    testimonials: [
      {
        name: 'Amine MEZGHICH',
        quote: "Une édition qui pose les bases — Une première édition exceptionnelle qui a posé les bases d'un événement incontournable pour l'écosystème entrepreneurial tunisien.",
        ...(await uploadLocalImage('aminemezgh.JPG').then(({ url, publicId }) => ({ image: url, imagePublicId: publicId }))),
      },
    ],
    partnerLogos: [],
    introCards: [],
  },
  {
    order: 1,
    slug: 'edition2',
    editionLabel: '2ème édition',
    year: 2025,
    dateVenueText: "24 janvier 2025, à l'UTICA",
    tagline: 'Innovation et Entrepreneuriat pour un Avenir Durable',
    ...(await buildImage('famillecompr.png').then(({ image, imagePublicId }) => ({ heroImage: image, heroImagePublicId: imagePublicId }))),
    stats: [
      { value: '+11', label: 'Sponsors' },
      { value: '+86%', label: 'Taux de Satisfaction' },
      { value: '+500', label: 'Participants' },
    ],
    gallery: await Promise.all([
      buildImage('lahisl.jpeg'),
      buildImage('poledccom.jpg'),
      buildImage('amenistand.jpeg'),
      buildImage('lahiani.JPG'),
      buildImage('stand.jpeg'),
    ]),
    testimonials: [],
    partnerLogos: await Promise.all([
      buildImage('darblockchain.png'),
      buildImage('digicom.png'),
      buildImage('digitalcollege.png'),
      buildImage('Asteelflash.png'),
      buildImage('lapresse.png'),
      buildImage('managers.png'),
      buildImage('monétique.png'),
      buildImage('resnati.png'),
      buildImage('SLR.png'),
    ]),
    introCards: [],
  },
  {
    order: 2,
    slug: 'legacy',
    editionLabel: 'Legacy — 1ère & 2ème éditions',
    dateVenueText: '',
    tagline: 'Innovation et Entrepreneuriat pour un Avenir Durable',
    ...(await buildImage('edition12.png').then(({ image, imagePublicId }) => ({ heroImage: image, heroImagePublicId: imagePublicId }))),
    stats: [
      { value: '+10', label: 'Sponsors' },
      { value: '+90%', label: 'Taux de Satisfaction' },
      { value: '+250', label: 'Participants' },
    ],
    gallery: await Promise.all([
      buildImage('003comp.png'),
      buildImage('015comp.png'),
      buildImage('296comp.png'),
      buildImage('167comp.png'),
      buildImage('073comp.png'),
    ]),
    testimonials: await Promise.all([
      uploadLocalImage('imen.png').then(({ url, publicId }) => ({
        name: 'Imen LOUATI',
        quote: "Un très beaux panel, qualité des échange, partage d'expérience et valeurs et beaucoup d'apprentissage. Un événement réussi à tous les niveaux. Merci ENSI Junior Entreprise",
        image: url,
        imagePublicId: publicId,
      })),
      uploadLocalImage('saws.png').then(({ url, publicId }) => ({
        name: 'Sawssen HAJ AMOR',
        quote: 'Bravo ENSI Junior Entreprise pour cet événement parfaitement organisé ! Votre énergie et votre professionnalisme ont vraiment fait la différence. Ce fut un plaisir de partager ce moment avec vous.',
        image: url,
        imagePublicId: publicId,
      })),
      uploadLocalImage('IMENcomp.png').then(({ url, publicId }) => ({
        name: 'Imen BEN JEMIAA',
        quote: "Bravo à toute l'équipe pour votre engagement et pour avoir su rassembler des experts autour de discussions essentielles pour l'avenir.",
        image: url,
        imagePublicId: publicId,
      })),
    ]),
    partnerLogos: [],
    introCards: [
      { icon: 'handshake', title: 'Valeurs', text: "Encourager l'esprit entrepreneurial et l'innovation." },
      { icon: 'zap', title: 'Thématique', text: 'Transformer les idées en actions concrètes et durables.' },
      { icon: 'info', title: 'Information', text: "Réunir des participants de divers horizons pour l'échange." },
    ],
  },
];

const run = async () => {
  if (!cloudinaryConfigured) {
    console.log('Cloudinary non configuré (.env) — les éditions seront créées sans images. Vous pourrez les ajouter depuis le dashboard admin.');
  }

  await connectDB();

  const editions = await buildEditions();

  for (const editionData of editions) {
    const existing = await Edition.findOne({ slug: editionData.slug });
    if (existing) {
      await Edition.findByIdAndUpdate(existing._id, editionData);
      console.log(`Édition mise à jour : ${editionData.slug}`);
    } else {
      await Edition.create(editionData);
      console.log(`Édition créée : ${editionData.slug}`);
    }
  }

  process.exit(0);
};

run().catch((error) => {
  console.error('Échec du seed des éditions :', error);
  process.exit(1);
});
