const express = require('express');
const userCtrl = require('../controllers/user');
const router = express.Router();

const passwordValidator = require('../middleware/password-validator');

router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login',  userCtrl.login);

module.exports = router;