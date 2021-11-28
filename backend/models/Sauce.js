const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const regexSauce = /^[a-z]/i;

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

sauceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Sauce', sauceSchema);