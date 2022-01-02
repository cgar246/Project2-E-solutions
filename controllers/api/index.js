const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const courseRoutes = require('./course-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
