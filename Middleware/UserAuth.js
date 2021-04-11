const e = require("express");
const jwt = require("jsonwebtoken");
const querryBuilder = require("../Config/Database");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
module.exports = async (req, res, next) => {
    try {
        if (req.header("Authorization")) {
            const token = req.header("Authorization").replace("Bearer ", "");
            if (token) {
                const verifyToken = await jwt.verify(token, JWT_SECRET_KEY);
                if (verifyToken) {
                    const { idUser } = verifyToken;
                    const user = await querryBuilder("Customer").where("idUser", idUser).first();
                    const { fullname, license, mail, phoneNum, birth, avatar, cmnd, password, created_at } = JSON.parse(JSON.stringify(user));
                    next();
                }
            }
        } else {
            res.status(400).json({
                message: "You need account to get next action"
            })
        }
    } catch (e) {
        console.log(e)
        res.status(400).JSON({
            message: "You need account to get next action"
        })
    }
}