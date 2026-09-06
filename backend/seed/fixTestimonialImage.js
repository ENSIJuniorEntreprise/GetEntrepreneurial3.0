// backend/seed/fixTestimonialImage.js
//
// Script ponctuel : upload une image locale compressée vers Cloudinary et
// met à jour le témoignage d'Amine MEZGHICH dans l'édition 1 (sa photo
// d'origine, 13,4 Mo, dépassait la limite gratuite Cloudinary de 10 Mo).
//
// Usage : node seed/fixTestimonialImage.js <chemin_image_compressée>

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const cloudinary = require('../config/cloudinary');
const connectDB = require('../config/db');
const Edition = require('../models/Edition');

(async () => {
  const imagePath = process.argv[2];
  if (!imagePath) {
    console.error('Usage : node seed/fixTestimonialImage.js <chemin_image_compressée>');
    process.exit(1);
  }

  const result = await cloudinary.uploader.upload(imagePath, { folder: 'get3.0/editions' });
  console.log('Uploadé :', result.secure_url);

  await connectDB();
  const edition = await Edition.findOne({ slug: 'edition1' });
  if (!edition) { console.log('Édition introuvable'); process.exit(1); }

  const testimonial = edition.testimonials.find((t) => t.name === 'Amine MEZGHICH');
  if (!testimonial) { console.log('Témoignage introuvable'); process.exit(1); }

  testimonial.image = result.secure_url;
  testimonial.imagePublicId = result.public_id;
  await edition.save();
  console.log('Édition mise à jour avec la nouvelle photo.');
  process.exit(0);
})().catch((err) => { console.error(err); process.exit(1); });
