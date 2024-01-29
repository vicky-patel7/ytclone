// const key = process.env.YT_API_KEY;
// const baseUrl = "https://www.googleapis.com/youtube/v3/search";
const errorHandler = require('../errors/errorHandler');
// const axios = require('axios');
const Video = require('../models/Videos');
const History = require('../models/History');


const musicHandler = async (req, res, next) => {
    const tags = ["music", "song", "songs", "trending songs"];
    try {
        const videos = await Video.find({
            tags : {$in : tags},
            category : "music"
        });
        res.status(200).json(videos);
    } catch (err) {
        next(errorHandler(err.status, err.message));
    }
}

const sportsHandler = async (req, res, next) => {
    const tags = ["sport", "sports", "olympics", "games", "football", "cricket", "kabaddi", "wrestling", "volleyball", "asian games"];
    try {
        const videos = await Video.find({
            tags : {$in : tags},
            category : "sports"
        });
        res.status(200).json(videos);
    } catch (err) {
        next(errorHandler(err.status, err.message));
    }
}

const gamingHandler = async (req, res, next) => {
    const tags = ["gaming", "pubg", "minecraft", "games", "game"];
    try {
        const videos = await Video.find({
            tags : {$in : tags},
            category : "gaming"
        });
        res.status(200).json(videos);
    } catch (err) {
        next(errorHandler(err.status, err.message));
    }
}

const moviesHandler = async (req, res, next) => {
    const tags = ["movies", "movie", "latest movies", "bollywood", "hollywood", "cinema", "pvr", "south indian movies", "tollywood", "bhojpuri movies"];
    try {
        const videos = await Video.find({
            tags : {$in : tags},
            category : "movies"
        });
        res.status(200).json(videos);
    } catch (err) {
        next(errorHandler(err.status, err.message));
    }
}
const newsHandler = async (req, res, next) => {
    const tags = ["news", "news india", "aajtak news", "lallantop news", "world affairs", "world news"];
    try {
        const videos = await Video.find({
            tags : {$in : tags},
            category : "news"
        });
        res.status(200).json(videos);
    } catch (err) {
        next(errorHandler(err.status, err.message));
    }
}
const liveHandler = async (req, res, next) => {
    const tags = ["live", "live videos", "broadcasted", "streaming"];
    try {
        const videos = await Video.find({
            tags : {$in : tags},
            category : "live"
        });
        res.status(200).json(videos);
    } catch (err) {
        next(errorHandler(err.status, err.message));
    }
}

const libraryHandler = async (req, res, next) => {
    try {
        const videos = await Video.find({
            userId : req.user.id,
        });
        res.status(200).json(videos);
    }catch(err) {
        next(errorHandler(err.status, err.message));
    }
}

const historyHandler = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const history = await History.find({userId : userId});
        if(history.length === 0) {
            res.status(200).json(history);
            return;
        }
        const watchedVideoIds = history[0].videoId;
        const watchedVideos = await Video.find({
            _id : {$in : watchedVideoIds}
        });
        res.status(200).json(watchedVideos);
    }catch(err) {
        next(errorHandler(err.status, err.message));
    }
}

const addVideoIdToHistory = async (req, res, next) => {
    const userId = req.user.id;
    const videoId = req.params.id;
    try {
        await History.findOneAndUpdate({userId}, {
            $addToSet: {
                videoId: videoId,
            },
        }, { new: true, upsert: true });
        res.status(200).json("VideoId added to History of the User");
    }catch(err){
        next(errorHandler(err.status, err.message));
    }
}



module.exports = {
    musicHandler,
    sportsHandler,
    gamingHandler,
    moviesHandler,
    newsHandler,
    liveHandler,
    libraryHandler,
    historyHandler,
    addVideoIdToHistory,
}