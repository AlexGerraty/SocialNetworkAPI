const User = require('../models/User');
const Thought = require('../models/Thought');

const userController = {
    // Get all users
    getUsers: (req, res) => {
      User.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // Get a single user by its id and populated thought and friend data
    getUserId: (req, res) => {
      User.findOne({ _id: req.params.id })
        .populate({
          path: 'thoughts',
          select: '-__v'
        })
        .populate({
          path: 'friends',
          select: '-__v'
        })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user with this ID' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // Create a new user
    addUser: (req, res) => {
      User.create(req.body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
  
    // Update a user by its id
    updateUser: (req, res) => {
      User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user with this id' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
  
    // Delete a user by its id and associated thoughts
    deleteUser: (req, res) => {
      Thought.deleteMany({ userId: req.params.id })
        .then(() => {
          User.findOneAndDelete({ _id: req.params.id })
            .then(dbUserData => {
              if (!dbUserData) {
                res.status(404).json({ message: 'No user with this id' });
                return;
              }
              res.json(dbUserData);
            });
        })
        .catch(err => res.json(err));
    },
  
    // Add a friend to a user
    addFriend: (req, res) => {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true }
      )
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user with this id' });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },
  
    // Remove a friend from a user
    deleteFriend: (req, res) => {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      )
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user with this id' });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    }
  };
  
  module.exports = userController;