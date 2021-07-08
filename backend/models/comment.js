'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment', {
      contents: DataTypes.STRING,
      status: DataTypes.INTEGER      
    },
    {

    }
  );    
    Comment.associate = function(models){
      // define association here
      models.Comment.belongsTo(models.User,{
        foreignKey: {
          allowNull: false
        }
      });
      models.Comment.belongsTo(models.Post,{
        foreignKey: {
          allowNull: false
        }
      });
    
  };
  return Comment;
};