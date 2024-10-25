const router = require('express').Router();
const { Opinion, User } = require('../../models/Opinion');

const opinionController = {
  // Get all opinions
  async getOpinions(req, res) {
    try {
      const opinions = await Opinion.find().sort({ createdAt: -1 });
      res.json(opinions);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Get single opinion by ID
  async getSingleOpinion(req, res) {
    try {
      const opinion = await Opinion.findOne({ _id: req.params.opinionId });

      if (!opinion) {
        return res.status(404).json({ message: 'No opinion found with this ID' });
      }

      res.json(opinion);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Create a new opinion
  async createOpinion(req, res) {
    try {
      const opinion = await Opinion.create(req.body);

      // Push the created opinion's ID to the associated user's opinions array
      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { opinions: opinion._id } },
        { new: true }
      );

      res.json(opinion);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Update a opinion by ID
  async updateOpinion(req, res) {
    try {
      const opinion = await Opinion.findOneAndUpdate(
        { _id: req.params.opinionId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!opinion) {
        return res.status(404).json({ message: 'No opinion found with this ID' });
      }

      res.json(opinion);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Delete a opinion by ID
  async deleteOpinion(req, res) {
    try {
      const opinion = await Opinion.findOneAndDelete({ _id: req.params.opinionId });

      if (!opinion) {
        return res.status(404).json({ message: 'No opinion found with this ID' });
      }

      // Remove the opinion ID from the associated user's opinions array
      await User.findOneAndUpdate(
        { opinions: req.params.opinionId },
        { $pull: { opinions: req.params.opinionId } },
        { new: true }
      );

      res.json({ message: 'Opinion deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Add a reaction to a opinion
  async addReaction(req, res) {
    try {
      const opinion = await Opinion.findOneAndUpdate(
        { _id: req.params.opinionId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!opinion) {
        return res.status(404).json({ message: 'No opinion found with this ID' });
      }

      res.json(opinion);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Remove a reaction from a opinion
  async removeReaction(req, res) {
    try {
      const opinion = await Opinion.findOneAndUpdate(
        { _id: req.params.opinionId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!opinion) {
        return res.status(404).json({ message: 'No opinion found with this ID' });
      }

      res.json(opinion);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = router;