const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getSponsors, createSponsor, updateSponsor, deleteSponsor } = require('../controllers/sponsorController');

router.route('/')
  .get(getSponsors)
  .post(protect, createSponsor);

router.route('/:id')
  .put(protect, updateSponsor)
  .delete(protect, deleteSponsor);

module.exports = router;
