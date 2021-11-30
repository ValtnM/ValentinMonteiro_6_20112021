const passwordValidator = require('password-validator');


// Création d'un modèle de mot de passe définissant les différentes contraintes à respecter
const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8, 'Le mot de passe doit contenir 8 caractères minimum.')
.is().max(100, 'Le mot de passe doit contenir 100 caractères maximum.')
.has().uppercase(1, 'Le mot de passe doit contenir au moins une majuscule.')
.has().lowercase(1, 'Le mot de passe doit contenir au moins une minuscule.')
.has().digits(1, 'Le mot de passe doit contenir au moins un chiffre.')
.has().not().spaces(1, "Le mot de passe ne doit pas contenir d'espace.")
.has().not().symbols(1, 'Le mot de passe ne doit pas contenir de caractères spéciaux.');

module.exports = passwordSchema;