const mysql = require('mysql');
require('dotenv').config();

//mysql
const sql = mysql.createConnection({
    host    :'localhost',
    user    :'root',
    password: '',
    database:'dbgroupomania'
});

//connection base de donnée
sql.connect(function(err){
    if(err){
        return console.err('error:'+ err.message);
    }
    console.log('Vous etes connecté à la base de donnée!');
});

module.exports = sql;