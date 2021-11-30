// Importation des modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const helmet = require('helmet');


// Importation des routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');


// Middlewares permettant l'analyse du corps de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Middleware Helmet
app.use(helmet());


// Autorise l'accès à l'API et l'envoie de requêtes
app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
    next();
});


// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://' + process.env.MONGODB_USERNAME + ':' + process.env.MONGODB_PASSWORD + '@cluster0.qcuwr.mongodb.net/piiquante?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Ajout des routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);


// Gestion des requêtes vers la route '/images'
app.use('/images', express.static(path.join(__dirname, 'images')));


// Ecoute et lie l'application au port 3000
app.listen(3000);
