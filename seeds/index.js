const seedUsers = require('./user-seeds');
const seedCourses = require('./course-seeds');
const seedComments = require('./comment-seeds');
const seedPicks = require('./pick-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  await seedCourses();
  console.log('--------------');

  await seedComments();
  console.log('--------------');

  await seedPicks();
  console.log('--------------');

  process.exit(0);
};

seedAll();
