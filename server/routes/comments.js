const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const {addComment, deleteComment, getComments} = require('../controllers/commentController');
const router = express.Router();


router.post('/', verifyJWT, addComment);
router.delete('/:id', verifyJWT, deleteComment);
router.get('/:videoId', verifyJWT, getComments);



module.exports = router;