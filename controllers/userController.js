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
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  userAdd: async (req, res) => {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },
  userUpdate: async (req, res) => {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );

      if (!dbUserData) {
        res.status(404).json({ message: 'No user can be found with this id' });
        return;
      }

      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },
  userDelete: async (req, res) => {
    try {
      await Thought.deleteMany({ userId: req.params.id });
      const dbUserData = await User.findOneAndDelete({ _id: req.params.id });

      if (!dbUserData) {
       res.status(404).json({ message: 'No user can be found with this id' });
        return;
      }

      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },
  friendAdd: async (req, res) => {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true }
      );

      if (!dbUserData) {
        res.status(404).json({ message: 'No user with this id' });
        return;
      }

      res.json(dbUserData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  friendDelete: async (req, res) => {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!dbUserData) {
        res.status(404).json({ message: 'No user with this id' });
        return;
      }

      res.json(dbUserData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = userController;