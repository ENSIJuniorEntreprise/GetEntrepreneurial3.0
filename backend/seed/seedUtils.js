// backend/seed/seedUtils.js
//
// Utilitaires partagés par les scripts de seed : upload best-effort d'une
// image locale du frontend vers Cloudinary (no-op si non configuré).

const path = require('path');
const cloudinary = require('../config/cloudinary');

const ASSETS_DIR = path.join(__dirname, '..', '..', 'frontend', 'src', 'assets', 'images');

const cloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET
);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Les seeds envoient beaucoup d'uploads en parallèle ; quelques échecs
// transitoires (réseau, congestion) sont normaux — on retente 2 fois
// avant d'abandonner et de laisser le champ image vide.
const uploadLocalImage = async (filename, folder = 'misc', attempt = 1) => {
  if (!cloudinaryConfigured) return { url: '', publicId: '' };
  try {
    const result = await cloudinary.uploader.upload(path.join(ASSETS_DIR, filename), { folder: `get3.0/${folder}` });
    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    if (attempt < 3) {
      await sleep(500 * attempt);
      return uploadLocalImage(filename, folder, attempt + 1);
    }
    const message = error?.message || error?.error?.message || JSON.stringify(error) || 'erreur inconnue';
    console.warn(`  ! Échec de l'upload de ${filename} après ${attempt} tentatives : ${message}`);
    return { url: '', publicId: '' };
  }
};

module.exports = { ASSETS_DIR, cloudinaryConfigured, uploadLocalImage };
