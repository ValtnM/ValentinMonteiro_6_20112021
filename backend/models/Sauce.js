const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


// Création d'une expression régulière pour les différents champs du formulaire
const regexSauce = /^[a-z]/i;


// Création d'un modèle de Sauce
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true},
    name: { type: String, required: true, unique: true, match: regexSauce},
    manufacturer: { type: String, required: true, match: regexSauce },
    description: { type: String, required: true, match: regexSauce },
    mainPepper: { type: String, require: true, match: regexSauce},
    imageUrl: { type: String, required: true},
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: Array, required: true},
    usersDisliked: { type: Array, required: true }
});


// Application du plugin "mongoose-unique-validator" sur le modèle
sauceSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Sauce', sauceSchema);