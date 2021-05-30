const e = require("express");
const jwt = require("jsonwebtoken");
const querryBuilder = require("../Config/Database");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
module.exports = async (req, res, next) => {
    try {

        const { fullname, license, mail, phoneNum, birth, avatar, cmnd, password, created_at } = req.body
        if (!fullname) {
            res.status(400).json({
                message: "Invalid fullname"
            })
        }
        if (!license) {
            res.status(400).json({
                message: "Invalid license"
            })
        }

        if (!mail || mail !== /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) {
            res.status(400).json({
                message: "Invalid email"
            })
        }

        if (!phoneNum || phoneNum != /^\d{10}$/) {
            res.status(400).json({
                message: "Invalid phone number"
            })
        }

        if (!birth) {
            res.status(400).json({
                message: "Invalid birthday"
            })
        }


        if (!cmnd || cmnd != /^\d{11}$/) {
            res.status(400).json({
                message: "Invalid Identity Card"
            })
        }

        if (!password || password != /^[A-Za-z]\w{7,14}$/) {
            res.status(400).json({
                message: "Invalid password"
            })
        }

        else {
            next();
        }
    } catch (e) {
        console.log(e)
        res.status(400).JSON({
            message: "Something wrong please try again"
        })
    }
}