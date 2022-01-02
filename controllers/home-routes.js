const router = require('express').Router();
const sequelize = require('../config/connection');
const { Course, User, Comment, Pick } = require('../models');

// get all courses for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Course.findAll({
    attributes: [
      'id',
      'course_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM pick WHERE course.id = pick.course_id)'), 'pick_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'course_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbCourseData => {
      const courses = dbCourseData.map(course => course.get({ plain: true }));

      res.render('homepage', {
        courses,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single course
router.get('/course/:id', (req, res) => {
  Course.findOne({
    where: {
      id: req.params.id
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
        model: Comment,
        attributes: ['id', 'comment_text', 'course_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbCourseData => {
      if (!dbCourseData) {
        res.status(404).json({ message: 'No course found with this id' });
        return;
      }

      const course = dbCourseData.get({ plain: true });

      res.render('single-course', {
        course,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


const lodash= require('lodash');

router.get('/sort', (req, res)=>{
  
  Course.findAll({
    attributes: [
      'id',
      'course_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM pick WHERE course.id = pick.course_id)'), 'pick_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'course_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbCourseData => {
      const courses = dbCourseData.map(course => course.get({ plain: true }));
      const sortedCourses = lodash.orderBy(courses, ['title'],['asc']);
      res.render('sortcourse', {sortedCourses,loggedIn: req.session.loggedIn})})})





module.exports = router;
