const { User } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate('friends thoughts');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // Get a single user by ID
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('friends thoughts');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // Update a user by ID
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this ID!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // Delete a user and remove associated thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      // Bonus: Delete all associated thoughts if a user is deleted
      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // Add a friend to the user's friend list
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },  // Add to friends array
        { new: true }
      ).populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with this ID!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // Remove a friend from the user's friend list
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },  // Remove from friends array
        { new: true }
      ).populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with this ID!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
