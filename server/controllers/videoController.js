const errorHandler = require('../errors/errorHandler');
const Video = require('../models/Videos');
const User = require('../models/Users');


// adding a video to the the database
const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const result = await newVideo.save();
        res.status(200).json(result);
    } catch (err) {
        next(errorHandler(err.status, "Error in adding a new video"));
    }
}


const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return next(errorHandler(err.status, "No such video!"));
        }
        if (req.user.id === video.userId) {
            const updateVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json(updateVideo);
        } else {
            return next(errorHandler(403, "You can update only your video"))
        }
    } catch (err) {
        next(errorHandler(err.status, "Error updating video"));
    }
}

const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return next(errorHandler(err.status, "No such video"));
        }
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("The video has been deleted");
        } else {
            return next(errorHandler(403, "You can update only your video"))
        }
    } catch (err) {
        next(errorHandler(err.status, "Error in deleting the video"));
    }
}

const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return next(errorHandler(err.status, "No video"));
        }
        res.status(200).json(video);
    } catch (err) {
        next(errorHandler(err.status, err.message));
    }
}


const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        })
        res.status(200).json("The view has been increased");
    } catch (err) {
        next(errorHandler(err.status, err.message));
    }
}

const randomVideo = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    } catch (err) {
        next(errorHandler(err.status, err.message));
    }
}


const trendVideo = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json(videos);
    } catch (err) {
        next(errorHandler(err.status, err.message));
    }
}

const subVideo = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subChannel = user.subscribedUsers;
        const list = await Promise.all(
            subChannel.map(channelId => {
                return Video.find({ userId: channelId })
            })
        );
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
        next(errorHandler(err.status, err.message));
    }
}

const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        const videos = await Video.find({
            title: { $regex: query, $options: "i" },
            tags: { $regex: query, $options: "i" },
        }).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};


module.exports = {
    addVideo,
    updateVideo,
    deleteVideo,
    getVideo,
    addView,
    randomVideo,
    trendVideo,
    subVideo,
    getByTag,
    search
}