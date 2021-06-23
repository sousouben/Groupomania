const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database_connect');
require('dotenv').config();
const passwordValidator = require('password-validator');
const { Connection } = require('mongoose');


const schema = new passwordValidator();
schema
.is().min(6)
.is().max(50)
.has().uppercase()
.has().lowercase()
.has().digits(1)
.has().not().spaces();

//inscription
exports.signup = (req,res,next)=>{
    if(schema.validate(req.body.password)){
        bcrypt.hash(req.body.password,10)
        .then(hash=>{
            const user = new User({
                email:req.body.email,
                password: hash
            });
            user.save()
            .then(()=> res.staus(201).json({message:'Utilisateur créé!'}));
        })
        .catch(error=> res.status(500).json({error}));
    }else{
        return res.status(400).json({
            message: 'Le mot de passe doit contenir au moins un chiffre, une minuscule, une majuscule et être composé de 6 caractère minimum!'
        })
    }
};

//Connection
exports.login = (req,res,next)=>{
    
}
