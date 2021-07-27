const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports={
    getUserId: function(data){
        if(data.length>1){
            let token = data.split(" ")[1];
            try{
                let decodedToken = jwt.verify(token, process.env.TOKEN)
                userId = decodedToken.userId
                return userId
            }catch(error){
                return error
            }

        }
    }
}