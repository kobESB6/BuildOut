const { User, Opinion } = require('../models');

const userController = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find().select('-__v');
      res.json(users);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ message: 'Failed to retrieve users.' });
    }
  },

  // Get single user by ID
  async getSingleUserById(req, res) {
    try {
      const singleUser = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('opinions');

      if (!singleUser) {
        return res.status(404).json({ message: 'No user found with this ID!' });
      }

      res.json(singleUser);
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ message: 'Failed to retrieve user.' });
    }
  },

  // Create a new user
  async createNewUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ message: 'Failed to create user.' });
    }
  },

  // Update a user
  async updateUserById(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        req.params.userId,
        req.body,
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'No user found to update!' });
      }

      res.json(updatedUser);
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ message: 'Failed to update user.' });
    }
  },

  // Delete a user and associated thoughts
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

      if (!deletedUser) {
        return res.status(404).json({ message: 'No user found with this ID!' });
      }

      // Bonus: Delete all associated thoughts
      await Opinion.deleteMany({ _id: { $in: deletedUser.opinions } });

      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ message: 'Failed to delete user.' });
    }
  },

  // Add a friend to the user's friend list
  async addFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'No user found with this ID!' });
      }

      res.json(updatedUser);
    } catch (err) {
      console.error('Error adding friend:', err);
      res.status(500).json({ message: 'Failed to add friend.' });
    }
  },

  // Remove a friend from the user's friend list
  async removeFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'No user found with this ID!' });
      }

      res.json(updatedUser);
    } catch (err) {
      console.error('Error removing friend:', err);
      res.status(500).json({ message: 'Failed to remove friend.' });
    }
  },
};
module.exports = userController;
