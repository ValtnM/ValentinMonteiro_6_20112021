const passwordValidator = require('../models/Password');


// Vérification de la solidité mot de passe choisi par l'utilisateur
module.exports = (req, res, next) => {
    try {
        const password = req.body.password;
        if(!passwordValidator.validate(password)) {
            res.status(400).json({message : passwordValidator.validate(req.body.password, {details: true})[0].message})
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({error});
    }
}