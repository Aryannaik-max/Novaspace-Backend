'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const { SALT } = require('../config/serverConfig');


module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.Workspace, { through: models.WorkspaceMember, foreignKey: 'userId', as: 'Workspaces' });
      user.hasMany(models.Workspace, { foreignKey: 'ownerId', as: 'OwnedWorkspaces' });
    }
  }
  user.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
      },
    }
  }, {
    sequelize,
    modelName: 'user',
  });

  user.beforeCreate( (user) => {
    const hashedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = hashedPassword;
  });
  
  return user;
};