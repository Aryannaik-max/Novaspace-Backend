'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkspaceMemeber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WorkspaceMemeber.init({
    userId: {
      type: DataTypes.INTEGER,
    },
    workspaceId: {
      type: DataTypes.INTEGER,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'member', 'viewer'],
      defaultValue: 'member',
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'WorkspaceMemeber',
  });
  return WorkspaceMemeber;
};