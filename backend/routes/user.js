const express = require('express');
const router = express.Router();

// Importation des middlewares
const passwordValidator = require('../middleware/password-validator');
const userCtrl = require('../controllers/user');


// Création des différentes routes "User"
router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login',  userCtrl.login);


module.exports = router;