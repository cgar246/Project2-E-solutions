const { Course } = require('../models');

const coursedata = [
  {
    title: 'Express -Authentication.',
    course_url: 'https://www.youtube.com/embed/2PPSXonhIck',
    user_id: 1
  },
  {
    title: 'CSS-Flex.',
    course_url: 'https://www.youtube.com/embed/fYq5PXgSsbE',
    user_id: 1
  },
  {
    title: 'Node - Express.',
    course_url: 'https://www.youtube.com/embed/L72fhGm1tfE',
    user_id: 1
  },


];

const seedCourses = () => Course.bulkCreate(coursedata);

module.exports = seedCourses;
