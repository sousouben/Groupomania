const models = require('../models');
const fs = require('fs');


//Permet de créer un nouveau post
exports.createPost = async(req, res)=>{
    try{
        //image
        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        if(!imageUrl){
            throw new Error('Désolé, ils y a des paramètres manquants');
        }
        
        //user
        const findUser = await models.User.findUser({
            attributes: ['pseudo', 'email'],
            where: { id:req.user.id },
        });
        if(!findUser){
            throw new Error('Désolé, nous ne trouvons pas votre compte');
        }

        //post
        const newPost = await models.Post.create({
            title: req.body.title,
            content: req.body.content,
            image: imageUrl,
            userId: req.user.id
        });
        if(!newPost){
            throw new Error('Désolé, paramètre manquants');
        }
        res.status(200).json({ error: error.message });

    }catch(error){
        res.status(400).json({
            error: error.message
        });
    }
};

//Récupérer la liste de tous les posts
exports.getAllPosts = async(req, res)=>{
    try{
        const fields = req.query.fields; //champs
        const order = req.query.order;

        const posts = await models.Post.findAll({
            order: [ order !=null ? order.split(':') : ['createdAt', 'DESC']],
            attributes: fields != '*' && fields !=null ? fields.split(',') : null,
            include: [
                {
                    model : models.User,
                    attributes: ['pseudo', 'email'],
                },
            ],
        });

        if(!posts){
            throw new Error('Désolé, sa na rien récupérer');
        }
        res.status(200).send(posts);

    }catch(error){
        res.status(400).json({
            error: error.message
        });
    }
};

//Récupérer un post
exports.getPostProfile = async(req, res)=>{
    try{


    }catch(error){
        res.status(400).json({
            error: error.message
        });
    }
};

//modifier un post
exports.moderatePost = async(req, res)=>{
    try{

    }catch(error){
        res.status(400).json({
            error: error.message
        });
    }
};

//supprimer un post
exports.deletePost = async(req, res)=>{
    try{

    }catch(error){
        res.status(404).json({
            error: error.message
        });
    }
};


