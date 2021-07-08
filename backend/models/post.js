'use strict';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post', {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      status: DataTypes.INTEGER,
      image: DataTypes.STRING
    },
    {

    }
  );    
    Post.associate = function(models){
      // define association here
      models.Post.hasMany(models.Comment);
      models.Post.belongsTo(models.User,{
        foreignKey: {
          allowNull: false
        }
      });
    
  };
  return Post;
};