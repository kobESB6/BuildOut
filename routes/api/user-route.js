const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get((req, res, next) => {
  console.log('GET request to get all users received');
  next(); 
  getUsers(req, res, next);
})

.post((req, res, next) => {
  console.log('POST request to create a new user received');
  next();
  createUser(req, res, next);
});

// /api/users/:userId
router.route('/:userId')
.get((req, res, next) => {
  console.log('GET request to get a single user received');
  next();
  getSingleUser(req, res, next);
})

.put((req, res, next) => {
  console.log('PUT request to update a user received');
  next();
  updateUser(req, res, next);
})

.delete((req, res, next) => {
  console.log('DELETE request to delete a user received');
  next();
  deleteUser(req, res, next);
});

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
.post((req, res, next) => {
  console.log('POST request to add a friend to a user received');
  next();
  addFriend(req, res, next);
})

.delete((req, res, next) => {
  console.log('DELETE request to remove a friend from a user received');
  next();
  removeFriend(req, res, next);
});

module.exports = router;
