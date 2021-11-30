const mongoose = require('mongoose');
const fs = require('fs');

const Sauce = require('../models/Sauce');


// Récupération et Affichage des sauces de la BDD
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}


// Récupération et Affichage d'une sauce spécifique
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}));
}


// Création d'une nouvelle sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce ajoutée !'}))
        .catch(() => {
            res.status(400).json({message: "Echec lors de la création de la sauce : données saisies incorrectes."});
            fs.unlink(`images/${req.file.filename}`, (error) => {
                if(error){
                    console.log("Echec de suppression de l'image : " + error);
                } else {
                    console.log("Image supprimée avec succès !");
                };
            });
        });
}


// Modification d'une sauce
exports.modifySauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            const imageName = sauce.imageUrl.split('/images/')[1];
            if (req.file){
                const sauceObject = {
                    ...JSON.parse(req.body.sauce),
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                };
                fs.unlink(`images/${imageName}`, (error) => {
                    if(error){
                        console.log("Echec de suppression de l'image : " + error);
                    } else {
                        console.log("Image supprimée avec succès !");
                    };
                });
                Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
                    .then(() => res.status(200).json({message: 'Sauce modifiée !'}))
                    .catch(error => res.status(400).json({error}));
            } else {
                const sauceObject = {
                    ...req.body
                };
                Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
                    .then(() => res.status(200).json({message: 'Sauce modifiée !'}))
                    .catch(error => res.status(400).json({error}));
            }
            
        })
        .catch(error => res.status(404).json({error}));
        
};


// Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: 'Sauce supprimée !'}))
                    .catch(error => res.status(400).json({error}))
            });
        })
        .catch(error => res.status(500).json({error}));
}


// Gestion des likes et dislikes
exports.likeSauce = (req, res, next) => {     
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            if(req.body.like === 1 && !sauce.usersLiked.includes(req.body.userId)){
                sauce.usersLiked.push(req.body.userId);
                Sauce.updateOne({_id: req.params.id}, {$inc:{likes: +1}, usersLiked: sauce.usersLiked})
                    .then(() => res.status(200).json({message: "L'utilisateur a liké !"}))
                    .catch(error => res.status(400).json({error}));
                
            }   
            
            else if (req.body.like === 0) {
                if(sauce.usersLiked.includes(req.body.userId)){
                    Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: { usersLiked: req.body.userId }})
                        .then(() => res.status(200).json({message: "L'utilisateur a liké !"}))
                        .catch(error => res.status(400).json({error}));
                } else if(sauce.usersDisliked.includes(req.body.userId)){                    
                    Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: { usersDisliked: req.body.userId }})
                        .then(() => res.status(200).json({message: "L'utilisateur a disliké !"}))
                        .catch(error => res.status(400).json({error}));
                }
                
            } 
            
            else if (req.body.like === -1 && !sauce.usersDisliked.includes(req.body.userId)) {
                sauce.usersDisliked.push(req.body.userId);
                Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: +1}, usersDisliked: sauce.usersDisliked})
                    .then(() => res.status(200).json({message: "L'utilisateur a disliké !"}))
                    .catch(error => res.status(400).json({error}));
            }
            
        })
        .catch(error => res.status(500).json({error}));
   
}