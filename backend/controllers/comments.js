const models = require('../models');
const fs = require('fs');

exports.createComment = async(req,res)=>{
    try{
        let comments = req.body.comments;
        const newCom = await models.Comment.create({
            comments: comments,
            userId: req.user.id,
            postId: req.params.id
        });
        if (newCom){
            res.status(201).json({ message: 'Votre commentaire a été envoyé',newCom});
        }else{
            throw new Error('Désolé, quelque chose s\'est mal passé');
        }

    }catch(error){
        res.status(400).json({
            error: error.message
        });
    }
};

exports.getComments = async(req,res)=>{
    try{
        const order = req.query.order;
        const comments = await models.Comment.findAll({
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
        }),
        if(comments){
            res.status(200).send({ message:comments });
        }else{
            throw new Error('Il n\'y a pas de commentaire');
        }

    }catch(error){
        res.status(400).json({
            error: error.message
        });
    }
};