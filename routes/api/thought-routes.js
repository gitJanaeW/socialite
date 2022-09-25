const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    createReply,
    deleteReply,
    deleteThought
} = require('../../controllers/thought-controllers');

// /api/thoughts
router.route('')
    .get(getAllThoughts)
    .post(createThought);

// /api/thoughts/:id
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reply
router.route('/:thoughtId/reply')
    .post(createReply)

 // /api/thoughts/:thoughtId/reply/:replyId   
router.route('/:thoughtId/reply/:replyId')
    .put(deleteReply);

module.exports = router;