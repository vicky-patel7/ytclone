const express = require('express');
const { updateUser, deleteUser, getUser, subscribeUser, unsubscribeUser, likeUser, dislikeUser, reportFeedbackHandler } = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');
const router = express.Router();

// update user
router.put('/:id', verifyJWT, updateUser)

// delete user
router.delete('/:id', verifyJWT, deleteUser);

// get a user
router.get('/find/:id', getUser)

// subscribe a user
router.put('/sub/:id', verifyJWT, subscribeUser)

// unsubscribe a user
router.put('/unsub/:id', verifyJWT, unsubscribeUser)

// like a video
router.put('/like/:videoId', verifyJWT, likeUser);

// dislike a video
router.put('/dislike/:videoId', verifyJWT, dislikeUser);

// report feedback or help route
router.post('/feedback', reportFeedbackHandler);

module.exports = router;