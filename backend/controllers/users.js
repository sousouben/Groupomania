const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
require('dotenv').config();


//inscription
exports.signup = (req,res,next)=>{
    try{

    }catch(error){
        res.status(400).json({
            error: error.message
        });
    }
};

//Connection
exports.login = (req,res,next)=>{
    try{

    }catch(error){
        res.status(400).json({
            error: error.message
        });
    }
};

//user profile
exports.userProfile =async (req,res)=>{
    try{

    }catch(error){
        res.status(400).json({
            error: error.message
        });
    }
};

//delete user
exports.deleteProfile = (req, res, next)=>{
    try{

    }catch(error){
        res.status(400).json({
            error: error.message
        });
    }
};
