const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    addFriend,
    removeFriend,
    deleteUser
} = require('../../controllers/user-controllers');

// /api/users
router.route('')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .put(removeFriend);

// /api/users/:id
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;