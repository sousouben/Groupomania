const models = require('../models/comment');
const fs = require('fs');

exports.createComment = async(req,res)=>{
    try{
        let comments = req.body.comments;
        const newCom = await models.comment.create({
            comments: comments,
            UserId: req.user.id,
            PostId: req.params.id
        });

        if(newCom){
            res.status(201).json({ message: 'Votre commentaire est envoyé'})
        }else{
            throw new Error("désolé, il y a un prolème");
        }
    }catch(error){
        res.status(400).json({ error: error.message });
    }
};
exports.getComments = async(req,res)=>{
    try{
        const order = req.query.order;
        const comments = await models.Comment.findAll({
            attributes: [
                "id",
                "comments",
                
                
            ]
        })

    }catch(error){
        res.status(400).json({ error: error.message });
    }
}