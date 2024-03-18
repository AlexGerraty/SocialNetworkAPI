const router = require('express').Router();
// Define variables
const {
    userFind,
    findByIdUser,
    userAdd,
    userUpdate,
    userDelete,
    friendAdd,
    friendDelete
  } = require('../../controllers/userController');

// GET all, POST at /api/users
router
  .route('/')
  .get(userFind)
  .post(userAdd);

// GET one by id, PUT, DELETE using /api/users/:id
router
  .route('/:id')
  .get(findByIdUser)
  .put(userUpdate)
  .delete(userDelete);

router
  .route('/:userId/friends/:friendId')
  .post(friendAdd)
  .delete(friendDelete);

module.exports = router;