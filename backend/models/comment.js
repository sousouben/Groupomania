'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.comment.belongsTo(models.User, {
        foreignKey: {
          allowNull:false
        }
      });
      models.comment.belongsTo(models.Post,{
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