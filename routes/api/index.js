const router = require('express').Router();
const userRoutes = require('./user-route');
const opinionRoutes = require('./opinion-route');

router.use('/user', userRoutes);
router.use('/opinion', opinionRoutes);

module.exports = router;
