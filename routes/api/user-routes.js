const {User} = require('../../models');

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
            path: 'thoughts', // capitalize?
            select: '-__v',
            // to populate thoughts with replies
            populate: { 
                path: 'replies',
                select: '-__v'
            }
        })
        .populate({
            path: 'friends', // capitalze?
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
    deleteUser(req, res) {
        User.findOneAndDelete({_id: params.id})
        .then(data => res.json(data))
        .catch(err => res.json(err));
    }
}

module.exports = userController;