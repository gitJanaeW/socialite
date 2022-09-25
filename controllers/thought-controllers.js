const {Thought, User} = require('../models');

const thoughtControllers = {
    getAllThoughts(req, res) {
        Thought.find({})
        .sort({_id: -1})
        .then(data => res.json(data))
        .catch(err => res.json(err));
    },
    getThoughtById(req, res) {
        Thought.findOne({_id: req.params.id})
        .sort({_id: -1})
        .populate({
            path: 'replies',
            select: '-__v'
        })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    createThought(req, res) {
        // connect thought to userId
        User.findOneAndUpdate(
            {_id: req.body.userId},
            {$push: {thoughts: req.body.id}},
            {new: true, runValidators: true}
        )
        .catch(err => {
            console.log(err);
        });
        // add thought to db
        Thought.create(req.body)
        .then(data => {
            res.json(data)
        })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
        
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.id}, body, {new: true, runValidators: true})
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No Thought found with this id'})
                return;
            }
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.id})
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    }
};

module.exports = thoughtControllers;