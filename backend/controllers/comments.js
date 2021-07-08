const models = require('../models');
const fs = require('fs');

exports.createComment = (req,res)=>{
        let comments = req.body.comments;
        const newCom = models.Comment.create({
            comments: comments,
            userId: req.body.userId,
            postId: req.params.id
        }).then(newCom =>{
            res.status(201).json({ message: 'Votre commentaire a été envoyé',newCom});
        }).catch(error =>{
            res.status(500).json({
                error
            })
        })    
};

exports.getComments = (req,res)=>{
    let comments = req.body.comments;
    const allCom = models.Comment.findAll({
            attributes:[
                "id",
                "userId",
                "contents",
                "status",
                "createdAt",
                "updatedAt"
            ],
            order: [order != null ? order.split(':') : ['createdAt', 'DESC']],
            where: { postId: req.params.id},
            include: [{ model: models.User,attributes: ['pseudo']}]
        })
        .then(allCom=>{
            res.status(200).send({ message:'les commentaires sont envoyés'});
        }).catch(error =>{
            res.status(500).json({
                error
            })
        })       
       
};