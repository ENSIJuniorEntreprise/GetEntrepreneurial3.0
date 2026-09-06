const { PassThrough } = require('stream');
const cloudinary = require('../config/cloudinary');

const ALLOWED_FOLDERS = ['speakers', 'sponsors', 'hero'];

// @desc    Uploader une image vers Cloudinary
// @route   POST /api/upload
// @access  Private/Admin
exports.uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Aucun fichier reçu.' });
  }

  const folder = ALLOWED_FOLDERS.includes(req.body.folder) ? req.body.folder : 'misc';

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: `get3.0/${folder}` },
        (error, uploadResult) => {
          if (error) return reject(error);
          resolve(uploadResult);
        }
      );
      const bufferStream = new PassThrough();
      bufferStream.end(req.file.buffer);
      bufferStream.pipe(uploadStream);
    });

    res.status(201).json({ success: true, url: result.secure_url, publicId: result.public_id });
  } catch (error) {
    res.status(500).json({ success: false, message: "Échec de l'upload de l'image.", error: error.message });
  }
};
