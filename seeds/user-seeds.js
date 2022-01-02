const sequelize = require('../config/connection');
const { User, Course } = require('../models');

const userData = [
  {
    username: 'jiang',
    email: 'jiang@gmail.com',
    password: '1234'
  },
  
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;
