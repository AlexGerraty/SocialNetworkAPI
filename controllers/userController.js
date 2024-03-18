const User = require('../models/User');
const Thought = require('../models/Thought');

const userController = {
  userFind: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  findByIdUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id })
        .select('-__v')
        .populate('friends')
        .populate('thoughts');
        res.json(user);
      if (!user) {
        return res.status(404).json({ message: 'No user can be found with this id' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  userAdd: async (req, res) => {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      res.json(err);
    }
  },
  userUpdate: async (req, res) => {
    try {
      const userData = await User.findOneAndUpdate(
        { userId: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );

      if (!userData) {
        res.status(404).json({ message: 'No user can be found with this id' });
        return;
      }

      res.json(userData);
    } catch (err) {
      res.json(err);
    }
  },
  userDelete: async (req, res) => {
    try {
      await Thought.deleteMany({ _id: req.params.id });
      const userData = await User.findOneAndDelete({ _id: req.params.id });

      if (!userData) {
       res.status(404).json({ message: 'No user can be found with this id' });
        return;
      }

      res.json(userData);
    } catch (err) {
      res.json(err);
    }
  },
  friendAdd: async (req, res) => {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true }
      );

      if (!userData) {
        res.status(404).json({ message: 'No user can be found with this id' });
        return;
      }

      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  friendDelete: async (req, res) => {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!userData) {
        res.status(404).json({ message: 'No user can be found with this id' });
        return;
      }

      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = userController;