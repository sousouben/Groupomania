const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
require('dotenv').config();


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
    User.findOne({ email: req.body.email})
    .then(user=>{
        console.log(user);
        if(!user){
            return res.status(401).json({ error: 'Utilisateur non trouvé'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid =>{
            if(!valid){
            return res.status(401).json({ error: 'Mot de passe incorrect !'});            
        }
        res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                {userId: user._id},
                process.env.TOKEN,
                {expiresIn: '24h'}
            )
        });
    })
    .catch(error => res.status(500).json({ error}));
    })
    .catch(error => res.status(500).json({ error}));    
};
//delete user
exports.deleteUser = (req, res, next)=>{

    if(error){
        return res.status(400).json({error});
    }

}
