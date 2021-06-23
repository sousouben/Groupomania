const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
const sequlize = require('sequelize');
require('dotenv').config();
const db = require('./database_connect');


const app = express();


//CORS
app.use((req, res, next) => { //autorisation d acces à l'API
    res.setHeader('Access-Control-Allow-Origin', '*'); //accéder à API depuis le port 4200  
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
    // ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');// envoyer des requêtes avec les méthodes mentionnées
    next();
  });

app.use(bodyParser.json());
app.use(helmet());

//routes
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);


module.exports = app;