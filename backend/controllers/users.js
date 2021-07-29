const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');//sequelize models user/post/comment
const validInput = require('../utils/ValidInput');//regex email/password/pseudo
require('dotenv').config();


//inscription
exports.signup = (req,res)=>{
    let email = req.body.email;
    let pseudo =  req.body.pseudo;
    let password = req.body.password;

    if(email == null || pseudo == null || password == null){
        res.status(400).json({ error:'tous les champs sont obligatoires!'});
    }
    // verification des inputs
    let emailok = validInput.validEmail(email);
    console.log(emailok);
    let passwordok = validInput.validPassword(password);
    console.log(passwordok);
    let pseudook = 
    validInput.validPseudo(pseudo);
    console.log(pseudook);

    if(emailok == true && passwordok == true && pseudook == true){
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
    }else {
        console.log('les champs ne sont pas valide')
    }
    
};

//Connection
exports.login = (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    if(email == null || password == null){
        res.status(400).json({ error: 'paramètre manquant!'});
    }
    models.User.findOne({
        where: { email: email}
    })
    .then(user=>{
        console.log(user);
        if(!user){
            return res.status(401).json({ error: 'Utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid =>{
            if(!valid){
                return res.status(401).json({ error: 'Mot de passe incorrect!'});
            }
            res.status(200).json({
                status: user.status,
                userId: user.id,
                token: jwt.sign(
                    { userId: user.id },
                    process.env.TOKEN,
                    { expiresIn: '24h' }
                  ),                
            });
    }).catch(error=>{ res.status(500).json({error})});
})
.catch(error => res.status(500).json({ error }));
};

//profil user (myprofile)
exports.userProfil = (req,res)=>{
    console.log(req.params.id);
    let id = req.params.id;
    models.User.findOne({ 
        where: { id: id }
    })    
    .then(user=>res.status(200).json(user))
    .catch(error=> res.status(500).json(error))    
};

//modification profil user
exports.changeProfil = (req,res)=>{
    let userId = req.body.userId;
    const newPassword = req.body.newPassword;
    console.log(newPassword);

    //verification regex newpassword
    console.log('admin', validInput.validPassword(newPassword));
    if(validInput.validPassword(newPassword)){
        //vérifie que le password est différent de l'ancien
        models.User.findOne({
            where: { id:userId }
        }).then(user => {
            console.log('Profil trouvé', user)
            bcrypt.compare(newPassword, user.password, (errComparePassword, resComparePassword) => {
                //bcrypt renvoit resComparePassword si les password sont identiques 
                if (resComparePassword) {
                    res.status(406).json({ error: 'Vous avez entré le même mot de passe!' })
                } else {
                    bcrypt.hash(newPassword, 10, function (err, bcryptNewPassword) {
                        models.User.update(
                            { password: bcryptNewPassword },
                            { where: { id: user.id } }
                        )
                            .then(() => res.status(201).json({ confirmation: 'mot de passe modifié avec succès!!' }))
                            .catch(err => res.status(500).json(err))
                    })
                }
            })
        })
        .catch(err => json(err))
} else {
    res.status(406).json({ error: 'mot de passe non valide !' })
}
}
//suppression user
exports.deleteProfil = (req, res)=>{
    models.Comment.destroy({
        where: { userId : req.params.id}
    })
    .then( 
        models.Post.destroy({
            where: { userId : req.params.id}
        })
        .then( 
            models.User.destroy({
                where: { id : req.params.id }
            })
            .then( res.status(200).json({ message: "Utilisateur supprimé!"}))
            .catch( error => res.status(500).json({ error}))

        )
        .catch( error => res.status(500).json({ error}))
    )
    .catch( error => res.status(500).json({ error}))
};