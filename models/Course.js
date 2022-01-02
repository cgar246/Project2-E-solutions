const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Course model
class Course extends Model {
  static pickFunction(body, models) {
    return models.Pick.create({
      user_id: body.id,
      course_id: body.course_id
    }).then(() => {
      return Course.findOne({
        where: {
          id: body.course_id
        },
        attributes: [
          'id',
          'course_url',
          'title',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM pick WHERE course.id = pick.course_id)'), 'pick_count']
        ],
        include: [
          {
            model: models.Comment,
            attributes: ['id', 'comment_text', 'course_id', 'user_id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]
      });
    });
  }
}

// create fields/columns for Course model
Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    course_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'course'
  }
);

module.exports = Course;
