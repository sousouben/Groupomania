const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next)=>{
    try{
        const token = req.headers.autorization.split('')[1];//on prend le token de la req
        const decodedToken = jwt.verify(token, process.env.TOKEN);//on décode grace au token secret
        const userId = decodedToken.userId;//on compare avec celui de la req
        if(req.body.userId && req.body.userId !== userId){
            throw ' Invalid user ID';
        }else{
            next();//on passe au middleware suivant s'il est juste
        }     

    }catch{
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};