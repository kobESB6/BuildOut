const { Opinion, User } = require('../models');

const OpinionController = {
  // Get all Opinions
  async getAllOpinions(req, res) {
    try {
      const getPhrase = await Opinion.find().sort({ createdAt: -1 });
      res.json(getPhrase);
    } catch (err) {
      console.error('Error fetching Opinions:',err);
      res.status(500).json({ message: 'Failed  getting Opinions' });
    }
  },

  // Get single Opinion by ID
  async getoneOpinionById(req, res) {
    try {
      const oneOpinion = await Opinion.findById( req.params.opinionId );

      if (!oneOpinion) {
        return res.status(404).json({ message: 'No opinions HERE!' });
      }
      res.json(oneOpinion);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to get an Opinon Phrase' });
    }
  },

  
  //Create a new Opinon/Phrase
  async createOpinon (req, res) {
    try {
      const User = await User.findById(req.body.creator);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const newOpinion = await opinion.create(req.body);
      user.ideas.push(newOpinon._id);
      await user.save();

      res.status(201).json({ message: 'Opinon successfully generated', opinion: newOpinion });
    } catch (err) {
      console.error('Error creating opinion:', err);
      res.status(500).json({ message: 'Failed to create opinion', error: err.message });
    }
  },
  // Update an Opinion
  async updateOpinion(req, res) {
    try {
      const UpdateOpinion = await Opinion.findAndUpdateById(
        req.params.OpinionId ,
         req.body ,
        { runValidators: true, new: true }
      );

      if (!updateOpinion) {
        return res.status(404).json({ message: 'No Opinions with this ID!' });
      }

      res.json(opinion);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update opinion' });
    }
  },

  // Delete a Opinion
  async deleteOpinion(req, res) {
    try {
      const deleteOpinion = await Opinion.findOneAndRemove(req.params.OpinionId );
      if(!deletedOpinion) {
        return res.status(404).json({ message: 'No Opinions with this ID!' });
      }

      await User.findByIdAndUpdate( 
        deletedOpinion.creator,
        { $pull: { ideas: req.params.opinionId } }
      );
      res.json({ message: 'Opinion removed' });
    } catch (err) {
      console.error('Error deleting idea:', err);
      res.status(500).json({ message: 'Failed to remove idea' });
    }
  },
      
      //Second Opinion
      async addSecondOpinion(req, res) {
        try {
          const secondOpinion = await Opinion.findByIdAndUpdate(
            req.params.opinionId,
            req.body,
            { runValidators: true, new: true }
          );
      if (!secondOpinion) {
        return res.status(404).json({ message: 'No Opinon with Here!' });
      };

      res.json(secondOpinion);
    } catch (err) {
      console.error('Error adding second opinion:', err);
      res.status(500).json({ message: 'Failed to add second opinion' });
    }
  },

      // Remove the Second Opinion from user's `opinion` field
      async removeSecondOpinion(req, res) {
        try {
      const updateOpinion = await opinion.findOneAndUpdate(
        { opinions: req.params.opinionId },
        { $pull: { opinions: req.params.opinionId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'Opinion deleted but no user found with this ID!' });
      }

      res.json({ message: 'Opinion successfully deleted!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete opinion' });
    }
  },

  // Add a reaction to a Opinion
  async addReaction(req, res) {
    try {
      const updatedOpinion = await Opinion.findOneAndUpdate(
        { _id: req.params.opinionId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!updatedOpinion) {
        return res.status(404).json({ message: 'No Opinion with this ID!' });
      }

      res.json(updatedOpinion);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to add reaction' });
    }
  },

  // Remove a reaction from a Opinion
  async removeReaction(req, res) {
    try {
      const updatedOpinion = await Opinion.findOneAndUpdate(
        { _id: req.params.opinionId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!updatedOpinion) {
        return res.status(404).json({ message: 'No Opinion with this ID!' });
      }

      res.json(updatedOpinion);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to remove reaction' });
    }
  },
};

module.exports = OpinionController;
