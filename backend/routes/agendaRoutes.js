const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getAgenda, createAgendaItem, updateAgendaItem, deleteAgendaItem } = require('../controllers/agendaController');

router.route('/')
  .get(getAgenda)
  .post(protect, createAgendaItem);

router.route('/:id')
  .put(protect, updateAgendaItem)
  .delete(protect, deleteAgendaItem);

module.exports = router;
