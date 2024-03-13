const router = require('express').Router();

const {
    getUsers,
    getUserId,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
  } = require('../../controllers/userController');

// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getUsers)
  .post(addUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getUserId)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;