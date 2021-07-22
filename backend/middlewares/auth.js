const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;//extraction de l'ID utilisateur de notre token 
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {//gestion des erreurs
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};