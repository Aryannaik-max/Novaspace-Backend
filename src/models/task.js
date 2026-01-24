'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      task.belongsTo(models.Workspace, { foreignKey: 'workspaceId' });
      task.belongsTo(models.user, { foreignKey: 'createdBy', as: 'creator' });
    }
  }
  task.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workspaceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'workspaces',
        key: 'id'
      }
    },
    section: {
      type: DataTypes.ENUM,
      values: ['todo', 'in-progress', 'done'],
      defaultValue: 'todo',
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    priority:{
      type: DataTypes.ENUM,
      values: ['low', 'medium', 'high'],
      defaultValue: 'medium',
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};