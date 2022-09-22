const {Thought} = require('../../models');

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
        Thought.create(req.body)
        .then(data => {
            
        })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    }
};

module.exports = thoughtControllers;