const models = require('../models');
const fs = require('fs');
const utils = require('../utils/jwt');

exports.createComment = (req,res)=>{ 
    let userId = utils.getUserId(req.headers.authorization)  
        let content = req.body.content;
        models.Comment.create({
            contents: content,
            status:0,
            UserId: userId,
            PostId: req.params.id
        }).then(newCom =>{
            res.status(201).json({ message: 'Votre commentaire a été envoyé',newCom});
        }).catch(error =>{
            res.status(500).json({
                error
            })
        })    
};

exports.getComments = (req,res)=>{
    models.Comment.findAll({
         where: { postId: req.params.id},
         include: [{ model: models.User,attributes: ['pseudo']}]
     })
     .then((comments)=>{
         models.User.findOne({
             where : { id: comments[0].UserId }
         })
         .then( user => {
             res.status(200).send({ message: comments })
         })
         .catch( error => {
             res.status(500).json({ error})
         })
     }).catch(error =>{
         res.status(500).json({
             error
         })
     })
};

exports.updateComment = (req, res)=>{
    if(!req.body.content){
        return res.status(400).json({ error: "Aucun contenu"});
    }
    models.Comment.update({ contents: req.body.content },{ where: {id: req.params.id}})
    .then(()=> res.status(200).json({ message: "Commentaire modifié"})
    .catch(error=> res.status(500).json({error})))
};

exports.deleteComment = (req, res)=>{
    models.Comment.destroy({
        where: { id:req.params.id }
    })
    .then(()=> res.status(200).json({ message: "Commentaire supprimé"}))
    .catch(error => res.status(500).json({ error }))};