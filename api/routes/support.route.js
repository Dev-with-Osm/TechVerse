const express = require('express');
const { verifyToken } = require('../utils/verifyUser');
const { addSupportMessage } = require('../controllers/support.controller');

const router = express.Router();

router.post('/', addSupportMessage);

module.exports = router;
