const models = require('../models');
const fs = require('fs');

exports.createComment = (req,res)=>{
        let content = req.body.content;
        models.Comment.create({
            contents: content,
            status:0,
            UserId: req.body.userId,
            PostId: req.params.id//dans l'url
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
        .then(()=>{
            res.status(200).send({ message:'les commentaires sont envoyés'});
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