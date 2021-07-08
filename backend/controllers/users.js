const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
require('dotenv').config();


//inscription
exports.signup = (req,res,next)=>{
    let email = req.body.email;
    let pseudo =  req.body.pseudo;
    let password = req.body.password;

    if(email == null || pseudo == null || password == null){
        res.status(400).json({ error:'tous les champs sont obligatoire!'});
    }
    models.User.findOne({
        where: {
            email: email
        }
    })
    .then(user =>{
        if(!user){
            bcrypt.hash(password,10 , function(error, success ){
                const newUser = models.User.create({
                    email: email,
                    pseudo: pseudo,
                    password: success,
                    status: 0

                }).then( newUser=>{
                    res.status(201).json({ message: 'Utilisteur enregistré',newUser});
                }).catch(error =>{
                    res.status(500).json({
                        error
                    })
                })    
            })
        }

    })
    .catch(error=>{
        res.status(500).json({ error });
    })

    
};

//Connection
exports.login = (req,res,next)=>{
    try{

    }catch(error){
        res.status(400).json({
            error: error.message
        });
    }
};

//user profile
exports.userProfile =async (req,res)=>{
    try{

    }catch(error){
        res.status(400).json({
            error: error.message
        });
    }
};

//delete user
exports.deleteProfile = (req, res, next)=>{
    try{

    }catch(error){
        res.status(400).json({
            error: error.message
        });
    }
};
