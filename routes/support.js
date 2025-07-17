const express = require('express');
const router = express.Router();
const { handleSupportForm } = require('../controllers/supportController');

router.post('/', handleSupportForm);

module.exports = router;
