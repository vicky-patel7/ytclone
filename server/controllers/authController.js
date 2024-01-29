const mongoose = require('mongoose');
const User = require('../models/Users');
const errorHandler = require('../errors/errorHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// controller for the creating a new user in the database
const signup = async (req, res, next) => {
    try {
        const SALT = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, SALT);
        const newUser = new User({ ...req.body, password: hashedPass });
        await newUser.save();
        res.status(200).send('User has been created successfully');
    } catch (err) {
        next(errorHandler(err.status, err.message));
    }
}

// controller for the signin route
const signin = async (req, res, next) => {
    try {
        const userFound = await User.findOne({ email: req.body.email });
        if (userFound) {
            const matched = bcrypt.compare(req.body.password, userFound.password);
            if (matched) {
                const token = jwt.sign({ id: userFound._id }, process.env.JWT);
                const { password, ...otherDetails } = userFound._doc;
                res.cookie('access_token', token, {
                    httpOnly: true,
                    maxAge : 60 * 60 * 24 * 30
                });
                res.status(200).json(otherDetails);
            } else {
                return next(errorHandler(400, "Wrong Credentials!"));
            }
        } else {
            return next(errorHandler(404, "User not found"));
        }
    } catch (err) {
        // implement using middleware
        // app.use((err, req, res, next) => {})
        // using middleware or define on the index.js page
        next(errorHandler(500, "Something went wrong"));
    }
}

const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({email : req.body.email});
        if(user) {
            const token = jwt.sign({id : user._id}, process.env.JWT);
            res.cookie('access_token', token, {
                httpOnly: true,

            }).status(200).json(user._doc);
        }else {
            const newUser = new User({
                ...req.body,
                fromGoogle : true
            })
            const savedUser = await newUser.save();
            const token = jwt.sign({id : savedUser._id}, process.env.JWT);
            res.cookie('access_token', token, {
                httpOnly : true,
            }).status(200).json(savedUser._doc);
        }
    }catch{
        next(errorHandler(500, "Something Went Wrong"));
    }
}

module.exports = { signup, signin, googleAuth };