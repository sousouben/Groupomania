const jwt = require('jsonwebtoken');
const models = require('../models/');
require('dotenv').config();

module.exports = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    let userId = decodedToken.userId;


    models.Post.findOne({ where : { id : req.params.id }})
    .then((post)=> {
        let postUserId = post.UserId;

        models.User.findOne({
            where: { id: userId }
        })
        .then((user) => {
            if (userId === postUserId || user.status === 1) {
                next();
            } else {
                res.status(401).json({ message: "L'utilisateur ne peut pas supprimer ce message"});
            }
        })
        .catch((err)=> {res.status(408).json({ message: "Utilisateur non trouvé", err }); })
    })
    .catch((err) => {res.status(401).json({ error });})
}
