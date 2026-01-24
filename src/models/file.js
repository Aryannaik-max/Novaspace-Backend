'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      file.belongsTo(models.user, { foreignKey: 'uploadedBy', as: 'uploader' });  
      file.belongsTo(models.Workspace, { foreignKey: 'workspaceId' });
    }
  }
  file.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uploadedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'users',
          key: 'id'
        }
    },
    workspaceId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'workspaces',
          key: 'id'
        }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'file',
  });
  return file;
};