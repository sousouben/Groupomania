'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    
    static associate(models) {
      // define association here
      models.Post.hasMany(
        models.comment,
        { foreignKey : "id_posts"},
        { onDelete: "cascade" }
      );
      models.Post.belongTo(models.User,{
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    status: DataTypes.STRING,
    image: {type: DataTypes.STRING, allowNull: true}
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};