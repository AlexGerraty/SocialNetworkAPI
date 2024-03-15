const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const dbThoughtData = await Thought.find({})
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v');
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const dbThoughtData = await Thought.findById(req.params.id)
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v');
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thoughts found with that id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  addThought: async (req, res) => {
    try {
      const { _id } = await Thought.create(req.body);
      const dbThoughtData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  updateThought: async (req, res) => {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thoughts found with that id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  deleteThought: async (req, res) => {
    try {
      const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.id });
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thoughts found with that id!' });
        return;
      }
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thoughts: req.params.id } },
        { new: true }
      );
      if (!dbUserData) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  addReaction: async (req, res) => {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      ).populate({ path: 'reactions', select: '-__v' }).select('-__v');
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thoughts with this ID.' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {console.log(err);
      res.status(400).json(err);
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: 'Nope!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
};

module.exports = thoughtController;
