const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getEditions,
  getEditionBySlug,
  createEdition,
  updateEdition,
  deleteEdition,
} = require('../controllers/editionController');

router.get('/slug/:slug', getEditionBySlug);

router.route('/')
  .get(getEditions)
  .post(protect, createEdition);

router.route('/:id')
  .put(protect, updateEdition)
  .delete(protect, deleteEdition);

module.exports = router;
