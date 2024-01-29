const User = require('../models/Users');
const Comment = require('../models/Comments');
const Video = require('../models/Videos');
const errorHandler = require('../errors/errorHandler');

const addComment = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    try {
        const result = await newComment.save();
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);
        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("The comment has been deleted")
        } else {
            return next(errorHandler(403, "You can not delete a comment"));
        }
    } catch (err) {
        next(err);
    }
}

const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId });
        res.status(200).json(comments);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addComment,
    deleteComment,
    getComments
};