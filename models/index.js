// import all models
const Course = require('./Course');
const User = require('./User');
const Pick = require('./Pick');
const Comment = require('./Comment');

// create associations
User.hasMany(Course, {
  foreignKey: 'user_id'
});

Course.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(Course, {
  through: Pick,
  as: 'picked_courses',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Course.belongsToMany(User, {
  through: Pick,
  as: 'picked_courses',
  foreignKey: 'course_id',
  onDelete: 'SET NULL'
});

Pick.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Pick.belongsTo(Course, {
  foreignKey: 'course_id',
  onDelete: 'SET NULL'
});

User.hasMany(Pick, {
  foreignKey: 'user_id'
});

Course.hasMany(Pick, {
  foreignKey: 'course_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Course, {
  foreignKey: 'course_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Course.hasMany(Comment, {
  foreignKey: 'course_id'
});

module.exports = { User, Course, Pick, Comment };
