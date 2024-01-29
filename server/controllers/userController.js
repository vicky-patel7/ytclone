const User = require('../models/Users');
const Video = require('../models/Videos');
const Report = require('../models/Report');
const errorHandler = require('../errors/errorHandler');

// update user details handler
const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).send(updatedUser);
        } catch (err) {
            next(errorHandler(err.status, err.message));
        }
    } else {
        return next(errorHandler(403, 'You are allowed to update your account only'))
    }
}

// delete user
const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).send("User has been deleted");
        } catch (err) {
            next(errorHandler(err.status, err.message));
        }
    } else {
        return next(errorHandler(403, 'You are allowed to delete your account only'))
    }
}

// get a user
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(errorHandler(err.status, err.message));
    }
}

// subscribe a user
const subscribeUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: {
                subscribedUsers: req.params.id
            }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {
                subscribers: 1
            }
        });
        res.status(200).json("Subscribed successfully");
    } catch (err) {
        next(errorHandler(err.status, err.message));
    }
}

// unsubscribe a user
const unsubscribeUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: {
                subscribedUsers: req.params.id
            }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {
                subscribers: -1
            }
        });
        res.status(200).json("UnSubscribed successfully");
    } catch (err) {
        next(errorHandler(err.status, err.message));
    }
}

// like a video
const likeUser = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: {
                likes: id
            },
            $pull: {
                dislikes: id
            }
        });
        res.status(200).json("Video has been liked");
    } catch (err) {
        next(err);
    }
}

// dislike a video
const dislikeUser = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        });
        res.status(200).json("Video has been disliked");
    } catch (err) {
        next(err);
    }
}

const reportFeedbackHandler = async (req, res, next) => {
    const newReport = new Report({ ...req.body });
    console.log(newReport);
    try {
        const result = await newReport.save();
        console.log(result);
        res.status(200).json("Report has beensumbitted");
    } catch (err) {
        console.log(err);
        next(errorHandler(err.status, err.message));
    }
}


module.exports = { updateUser, deleteUser, getUser, subscribeUser, unsubscribeUser, likeUser, dislikeUser, reportFeedbackHandler };