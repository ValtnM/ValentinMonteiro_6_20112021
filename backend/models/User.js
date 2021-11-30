const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


// Création d'un modèle Utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true }
})


// Application du plugin "mongoose-unique-validator" sur le modèle
userSchema.plugin(uniqueValidator);



module.exports = mongoose.model('User', userSchema);