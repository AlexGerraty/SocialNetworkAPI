const User = require('../models/User');
const Thought = require('../models/Thought');

const thoughtController = {
  thoughtFind: async (req, res) => {
    try {
      const thoughts = await Thought.find({})
        .populate('reactions')
        .sort({ _id: -1 });

      res.json(thoughts);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  findByIdThought: async (req, res) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.id })
        .populate('reactions')
        .sort({ _id: -1 });

      if (!thought) {
        return res.status(404).json({ message: 'No thoughts can be found with this id' });
      }

      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  thoughtAdd: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      const dbThoughtData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thoughts can be found with this id' });
        return;
      }

      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  },
  thoughtUpdate: async (req, res) => {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate({ _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );

      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thoughtscan be found with this id' });
        return;
      }

      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  },
  thoughtDelete: async (req, res) => {
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
        res.status(404).json({ message: 'No thoughts can be found with this id' });
        return;
      }

      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },
  reactionAdd: async (req, res) => {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );

      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thoughts can be found with this id' });
        return;
      }

      res.json(dbThoughtData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  reactionDelete: async (req, res) => {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!dbThoughtData) {res.status(404).json({ message: '' });
        return;
      }

      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  }
};

module.exports = thoughtController;