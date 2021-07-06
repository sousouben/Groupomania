const jwt = require('jsonwebtoken');
require('dotenv').config();
const models = require('../models');

module.exports = async (req, res, next)=>{
    try{
        const token = req.headers.autorization.split('')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const user = await models.User.finOne( { where: {id:decodedToken.id} });//on compare avec celui de la req
        if(!user){
            throw new Error('invalid');
        }
        req.user = user;
        next();

    }catch(err){
        res.status(401).json({error: 'Invalid request!'});
    }
};