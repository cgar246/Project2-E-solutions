const router = require('express').Router();
const sequelize = require('../config/connection');
const { Course, User, Comment, Pick } = require('../models');
const withAuth = require('../utils/auth');

// get all courses for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Course.findAll({
    where: {
      user_id: req.session.user_id
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
      const courses = dbCourseData.map(course => course.get({ plain: true }));
      res.render('dashboard', { courses, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Course.findByPk(req.params.id, {
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
      if (dbCourseData) {
        const course = dbCourseData.get({ plain: true });
        
        res.render('edit-course', {
          course,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


module.exports = router;
