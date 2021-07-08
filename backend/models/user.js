'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true      
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false       
      },
      pseudo: {
        type: DataTypes.STRING,
        allowNull: false      
      },
      status: {
        type:DataTypes.INTEGER,
        allowNull:false
      }
    },
    {

    }
  );    
    User.associate = function(models){
      // define association here
      models.User.hasMany(models.Post);
          
  };
  return User;
};
