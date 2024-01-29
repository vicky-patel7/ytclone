const express = require('express');
const { addVideo, updateVideo, deleteVideo, getVideo, randomVideo, subVideo, addView, trendVideo, getByTag, search } = require('../controllers/videoController');
const verifyJWT = require('../middleware/verifyJWT');
const router = express.Router();

router.post('/', verifyJWT, addVideo);
router.put('/:id', verifyJWT, updateVideo);
router.get('/trend', trendVideo);
router.get('/sub', verifyJWT, subVideo);
router.get('/tags', getByTag);
router.get('/random', randomVideo);
router.get('/search', search);
router.delete('/:id', verifyJWT, deleteVideo);
router.get('/:id', getVideo);
router.put('/view/:id', addView);


module.exports = router;