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
        res.status(400).json({ error:'tous les champs sont obligatoires!'});
    }
    models.User.findOne({
        where: { email: email }
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
                    res.status(500).json({ error });
                });    
            });
        }
        else{
            res.status(404).json({ error: 'utilisateur existant!'});
        }
    })
    .catch(error=>{
        res.status(500).json({ error });
    })    
};

//Connection
exports.login = (req,res)=>{
    let pseudo = res.body.pseudo;
    let password = res.body.password;

    if(pseudo == null || password == null){
        res.status(400).json({ error: 'paramètre manquant!'});
    }
    models.User.findOne({
        where: { pseudo: pseudo}
    })
    .then(user=>{
        if(user){
            bcrypt.compare(password, user.password, (errComparePassword, resComparePassword)=>{
                if(resComparPassword){
                    res.status(200).json({
                        userId: user.id,
                        status: user.status
                    })
                }else{
                    res.status(403).json({ error:'password invalid'});
                };
            })
        }else{
            res.status(404).json({error: 'cet utilisateur n\'existe pas'})
        }
    }).catch(error=>{ res.status(500).json({error})})
};

//profil user (myprofile)
exports.userProfile = (req,res)=>{
    let id = req.body.id;
    models.User.findOne({ 
        where: { id: id }
    })
    .then(user=> res.status(200).json(user))
    .catch(error=> res.status(500).json(error))    
};

//suppression user
exports.deleteProfile = (req, res)=>{
    let userId = req.body.userId;

    if(userId !=null){
        models.User.finOne({
            where: { id: userId}
        })
        .then(user =>{
            if(user !=null){
                models.Post.destroy({
                    where: { userId: user.id }
                })
                .then(()=>{
                    console.log('Tous les posts de cet utilisateur ont été supprimé!');
                    models.User.destroy({
                        where: { id: user.id }
                    })
                    .then(()=> res.end())
                    .catch(error => console.log(error))        
                    
                }).catch(error => res.status(500).json(error))
            }else{
                res.status(401).json({ error: 'cet utilisateur n\'existe pas '})
            }
        })
    }else{
        res.status(500).json({ error: 'Impossible de supprimer ce compte!'})
    }
    };
