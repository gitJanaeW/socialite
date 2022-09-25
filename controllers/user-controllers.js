const {User} = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .sort({_id: -1})
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },
    getUserById(req, res) {
        User.findOne({_id: req.params.id})
        .populate({
            path: 'thoughts',
            select: '-__v',
            // to populate thoughts with replies
            populate: { 
                path: 'replies',
                select: '-__v'
            }
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    createUser(req, res) {
        User.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    addFriend(req, res) {
        // updating the friend's friends list
        User.findOneAndUpdate(
            {_id: req.params.friendId},
            {$push: {friends: req.params.userId}},
            {new: true, runValidators: true}
        )
        .catch(err => {
            console.log(err);
        });
        // updating the user's friends list
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$push: {friends: req.params.friendId}},
            {new: true, runValidators: true}
        )
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No user found matching this id'});
                return;
            }
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    },
    // NOT WORKING
    removeFriend(req, res) {
        // delete the user's friend from friend's list
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {new: true}
        )
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No user found matching this id'});
                return;
            }
            res.json(data);
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        });
        // delete the user from friend's friends list
        User.findOneAndUpdate(
            {_id: req.params.friendId},
            {$pull: {friends: req.params.userId}},
            {new: true}
        )
        .catch(err => {
            console.log(err);
        })
    },
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.id})
        .then(data => res.json(data))
        .catch(err => res.json(err));
    }
}

module.exports = userController;