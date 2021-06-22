const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
const sequlize = require('sequelize');
const dotenv = require('dotenv').config();

const app = express();

app.use((req, res, next)=>{
    console.log('requête reçue!');
    next();
});

app.use((req, res,next)=>{
    res.status(201);
    next();
});

app.use((req, res, next)=>{
    res.json({ message: 'votre requête a bien était reçue!'});
    next();
});

app.use((req, res)=>{
    console.log('réponse envoyée avec succès!')
});

app.use(bodyParser.json());
app.use(helmet());


module.exports = app;