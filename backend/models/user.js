'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post);
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      require:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      require:true
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true
    },
    status: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, 
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};