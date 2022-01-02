const { Pick } = require('../models');

const pickdata = [
  {
    user_id: 1,
    course_id: 1
  },
  {
    user_id: 1,
    course_id: 2
  },
  
];

const seedPicks = () => Pick.bulkCreate(pickdata);

module.exports = seedPicks;
