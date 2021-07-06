const models = require('../models');
const fs = require('fs');


//Permet de créer un nouveau post
exports.createPost = async(req, res)=>{
    try{

    }catch(error){
        res.status(400).json({
            error: error.message
        });
    }
};

//Récupérer la liste de tous les posts
exports.getAllPosts = async(req, res)=>{
    try{

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


