'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workspace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Workspace.belongsTo(models.user, { foreignKey: 'ownerId', as: 'Owner' });
      Workspace.belongsToMany(models.user, { through: models.WorkspaceMember, foreignKey: 'workspaceId', as: 'Members' });
    }
  }
  Workspace.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    totalMembers: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    inviteCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    } 
  }, {
    sequelize,
    modelName: 'Workspace',
  });

  return Workspace;
};