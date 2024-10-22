const { User, Thought } = require ('..models');
module.exports = {
   //Get all users  
   asnyc getUsers(req, res) {
    try {
        const users = await User.find().populate('thoughts friends');
        res.json(users);
    }   catch (err) {
        res.status(500).json(err);
    }
   },

   //Get single User
   async getSingleUser(req, res) {
    try {
        const user = await User.findOne({_id: req.params.userId})
        .populate('thoughts friends');
        if (!user) {
            return res.status(404).json({message: 'No user with that ID'});
        }
      res.json(user);

    } catch (err) {
      res.status(500).json(err);  
    }
   },
   //Create a new User
   async createUser(req, res) {
    const { Course, Student } = require('../models');
    try {
        const course = await User.create(req.body);
        res.json(user);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }

 
  },
 
  },
  // Delete a User
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }
      //Delete thoughts when user is deleted
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'user and thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
      {_id: req.params.userId},
      { $set: req.body },
      { runValidators: true, new: true });
      if (!user) {
        return res.status(404).json({message: 'No user with this ID!'});
      }
       res.json(user);
    } catch (err) {
      console.log(err);  
      res.status(500).json(err);
    }
  },
  //Add a friend to user's friend list
  async addFriend( req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: {friends: req.params.friendId} }, //add if not already added
            { new: true}
        ).populate('friends');
        if (!user) {
            return res.status(404).json({message: 'No user with this ID!'});
          }
          res.json(user);
        } catch (err) {
          console.log(err);  
          res.status(500).json(err);

    }
  }
}



   }
}
module.exports = {

