'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkspaceMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WorkspaceMember.belongsTo(models.user, { foreignKey: 'userId' });
      WorkspaceMember.belongsTo(models.Workspace, { foreignKey: 'workspaceId' });
    }
  }
  WorkspaceMember.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    workspaceId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Workspace',
        key: 'id'
      }
    },
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'member', 'viewer'],
      defaultValue: 'member',
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'WorkspaceMember',
  });
  return WorkspaceMember;
};