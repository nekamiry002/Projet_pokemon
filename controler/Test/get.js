const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const urlMongoDb = process.env.URL_MONGODB ;
// Créer une application Express
const app = express();

// Connexion à la base de données MongoDB
mongoose.connect(urlMongoDb)
.then(() => {
  console.log('Connecté à la base de données MongoDB');
})
.catch((err) => {
  console.error('Erreur de connexion à la base de données MongoDB :', err);
});



app.get('/test', async (req, res) => {
    try {
      const exemples = await Exemple.find();
      res.json(exemples);
    } catch (err) {
      console.error('Erreur lors de la récupération des exemples depuis la base de données :', err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
});