const User = require('../models/User');
const Thought = require('../models/Thought');

const thoughtController = {
    // Get all thoughts
    getAllThoughts: (req, res) => {
      Thought.find({})
        .populate({
          path: 'reactions',
          select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // Get a single thought by its id
    getThoughtId: (req, res) => {
      Thought.findOne({ _id: req.params.id })
        .populate({
          path: 'reactions',
          select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thoughts found with that id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // Create a new thought
    addThought: (req, res) => {
      Thought.create(req.body)
        .then(({ _id }) => {
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: _id } },
            { new: true }
          );
        })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
  
    // Update a thought by its id
    updateThought: (req, res) => {
      Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thoughts found with that id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
  
    // Delete a thought by its id
    deleteThought: (req, res) => {
      Thought.findOneAndDelete({ _id: req.params.id })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thoughts found with that id!' });
            return;
          }
          return User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { thoughts: req.params.id } },
            { new: true }
          )
        })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
  
    // Add a reaction to a thought
    addReaction: (req, res) => {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      )
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thoughts with this ID.' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
  
    // Remove a reaction from a thought
    deleteReaction: (req, res) => {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      )
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'Nope!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }
  };
  
  module.exports = thoughtController;