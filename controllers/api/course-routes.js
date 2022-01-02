const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Course, User, Comment, Pick } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
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
    .then(dbCourseData => res.json(dbCourseData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
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
      res.json(dbCourseData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//withAuth to be added

router.post('/', withAuth, (req, res) => {
  // expects {title: 'Taskmaster goes public!', course_url: 'https://taskmaster.com/press', user_id: 1}
  Course.create({
    title: req.body.title,
    course_url: req.body.course_url,
    user_id: req.session.user_id
  })
    .then(dbCourseData => res.json(dbCourseData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//withAuth to be added

router.put('/pick', withAuth, (req, res) => {
  // custom static method created in models/Course.js
  console.log(req.session);
  Course.pickFunction({ ...req.body, user_id:req.session.user_id}, { Pick, Comment, User })
    .then(updatedPickData => res.json(updatedPickData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//withAuth to be added

router.put('/:id', withAuth, (req, res) => {
  Course.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbCourseData => {
      if (!dbCourseData) {
        res.status(404).json({ message: 'No course found with this id' });
        return;
      }
      res.json(dbCourseData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//withAuth to be added

router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Course.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCourseData => {
      if (!dbCourseData) {
        res.status(404).json({ message: 'No course found with this id' });
        return;
      }
      res.json(dbCourseData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
