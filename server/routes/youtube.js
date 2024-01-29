const express = require('express');
const router = express.Router();
const {musicHandler, sportsHandler, gamingHandler, moviesHandler, newsHandler, liveHandler, libraryHandler, historyHandler, addVideoIdToHistory} = require('../controllers/youtubeController');
const verifyJWT = require('../middleware/verifyJWT');

router.get('/music', musicHandler);
router.get('/sports', sportsHandler);
router.get('/gaming', gamingHandler);
router.get('/movies', moviesHandler);
router.get('/news', newsHandler);
router.get('/live', liveHandler);
router.get('/library', verifyJWT, libraryHandler);
router.get('/history', verifyJWT, historyHandler);
router.put('/history/:id', verifyJWT, addVideoIdToHistory);

module.exports = router;