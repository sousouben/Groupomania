const models = require('../models');
const fs = require('fs');


//Permet de créer un nouveau post
exports.createPost = (req, res)=>{
    let imageUrl;
    let id = res.body.id;
    models.User.findOne({
        where: {id: id}
    })
    .then(user =>{
        if(user !== null){
            let content = req.body.content;
            if(req.file != undefined){
                imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            }
            else{
                imageUrl == null
            };
            if((content == null && imageUrl == null)){
                res.status(400).json({error: 'Rien à publier'})
            }else{
                models.Post.create({
                    content: content,
                    image: imageUrl,
                    UserId: user.id
                }).then((newPost)=>{
                    res.status(201).json(newPost)
                })
                .catch((error)=>{
                    res.status(500).json(error)
                })
            };
        }else{
            res.status(400).json(error);
        }
    }).catch(error=> res.status(500).json(error));
}
    
//Récupérer la liste de tous les posts
exports.getAllPosts = (req, res)=>{
    models.Post.findAll({
        include: [{
            model: models.User,
            attributes:['pseudo']
        }],
        order:[['createdAt', 'DESC']]
    }).then(posts=>{
        if(posts.length > null){
            res.status(200).json(posts)
        }else{
            res.status(404).json({ error: 'Pas de post à afficher'})
        }
    }).catch(error=> res.status(500).json(error))
    
};

//modifier un post
exports.updatePost = (req, res)=>{
    let userOrder = req.body.userIdOrder;
    let id = req.body.id;
    models.User.findOne({
        attributes: ['id', 'email', 'pseudo','status'],
        where: { id: id }
    })
    .then(user =>{
        if(user && (user.status == true || user.id == userOrder)){
            console.log('modification ok pour le post:', req.body.postId);
            models.Post.update({
                content: req.body.newText,
                image: req.body.newImg
            },
            {
                where: {id: req.body.postId}
            }).then(()=> res.end())
            .catch(error=> res.status(500).json(error))
        }else{
            res.status(401).json({error: 'utilisateurnon autorisé à modifier ce post'})
        }
    })
    .catch(error=> res.status(500).json(error));
};

//supprimer un post
exports.deletePost = (req, res)=>{
    let userOrder = req.body.userIdOrder;
    let id = req.body.id;

    models.User.findOne({
        attributes: ['id', 'email', 'pseudo', 'status'],
        where: { id: id}
    }).then(user=>{
        if(user && (user.status == true || user.id ==userOrder)){
            console.log('suppression du post id:', req.body.postId);
            models.Post.findOne({
                where: { id: req.body.postId}
            })
            .then((postFind)=>{
                if(postFind.image){
                    const filename = postFind.image.split('/images/')[1];
                    console.log('test', filename);
                    fs.unlink(`images/${filename}`,()=>{
                        models.Post.destroy({
                            where:{ id: postFind.id}
                        }).then(()=>res.end())
                        .catch(error=> res.status(500).json(error))
                    })
                }else{
                    models.Post.destroy({
                        where:{ id:postFind.id}
                    })
                    .then(()=>res.end())
                    .catch(error=> res.status(500).json(error))
                }
            }).catch(error => res.status(500).json(error))
        }else{
            res.status(403).json('utilisateur non autorisé à supprimer ce post')
        }
    }).catch(error=> res.status(500).json(error));    
};