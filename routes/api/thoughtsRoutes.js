const router = require('express').Router();

const {
  thoughtFind,
  findByIdThought,
  thoughtAdd,
  thoughtUpdate,
  thoughtDelete,
  reactionAdd,
  reactionDelete
} = require('../../controllers/thoughtController');

// GET all, POST at /api/thoughts
router
  .route('/')
  .get(thoughtFind)
  .post(thoughtAdd);

//  GET one, PUT, DELETE at /api/thoughts/:id
router
  .route('/:id')
  .get(findByIdThought)
  .put(thoughtUpdate)
  .delete(thoughtDelete);

// Post at /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(reactionAdd);

  router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(reactionDelete);

module.exports = router;