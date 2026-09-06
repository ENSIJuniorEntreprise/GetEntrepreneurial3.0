const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getSiteContent, updateSiteContent } = require('../controllers/siteContentController');

router.route('/')
  .get(getSiteContent)
  .put(protect, updateSiteContent);

module.exports = router;
