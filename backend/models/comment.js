'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull:false
        }
      });
      models.Comment.belongsTo(models.Post,
        {
        foreignKey: {
          allowNull:false
        }
      },
      { onDelete: "cascade" }
      );
    }
  };
  Comment.init({
    contents: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};