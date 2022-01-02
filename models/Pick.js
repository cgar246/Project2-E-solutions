const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pick extends Model {}

Pick.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    course_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'course',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'pick'
  }
);

module.exports = Pick;
