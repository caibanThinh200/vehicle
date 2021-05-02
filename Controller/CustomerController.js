const querryBuilder = require("../Config/Database")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const bcrypt = require("bcrypt");

class CustomerController {
    static async RegisterController(req, res, next) {
        try {
            const {
                fullname,
                license,
                mail,
                phoneNum,
                birth,
                cmnd,
                password
            } = req.body

            const userInsert = {
                idUser: uuid.v4(),
                fullname,
                license,
                mail,
                phoneNum,
                birth,
                cmnd,
                password: bcrypt.hashSync(password, 10),
                created_at: new Date()
            }
            await querryBuilder("Customer").insert(userInsert);
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                result: "Registered"
            })
        }
        catch (e) {
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "insert failed: " + e
                }

            })
        }
    }
    static async LoginController(req, res, next) {
        try {
            const {
                email,
                password
            } = req.body;
            const userAccount = await querryBuilder("Customer").where("mail", email).select().first();

            const user = (JSON.parse(JSON.stringify(userAccount)));

            const { idUser, fullname, license, mail, phoneNum, birth, avatar, cmnd, created_at } = user
            if (!user.mail || !bcrypt.compareSync(password, user.password)) {
                res.status(200).json({
                    message: "Invalid mail or password"
                })
            }
            else {
                const token = jwt.sign({ idUser }, JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 });
                res.status(200).json({
                    status: "SUCCESS",
                    error: null,
                    data: token
                })
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: "Invalid mail or password"
            })
        }
    }
    static async GetUserByTokenController(req, res, next) {
        try {
            const token = req.header("Authorization").replace("Bearer ", "");
            const userId = jwt.verify(token, JWT_SECRET_KEY);
            const { idUser } = userId;
            const userInf = await querryBuilder("Customer").where("idUser", idUser).select().first();
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                data: userInf
            })
        } catch (e) {
            console.log(e);
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "Get user failed"
                }
            })
        }
    }
    static async GetUserByIdController(req, res, next) {
        try {
            const userId = req.params.id;
            const user = await querryBuilder("Customer").where("idUser", userId).first();
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                data: user
            })
        } catch (e) {
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "Get user failed"
                }
            })
        }
    }
    static async UpdateUserInfoController(req, res, next) {
        try {
            const {
                fullname,
                license,
                mail,
                phoneNum,
                birth,
                cmnd,
            } = req.body;
            const filename = req.file.filename ? req.file.filename : ''
            const idUser = req.params.id
            const updateData = {
                "fullname": fullname,
                "license": license,
                "mail": mail,
                "phoneNum": phoneNum,
                "birth": birth,
                "cmnd": cmnd,
                "avatar": filename
            }

            await querryBuilder("Customer").where("idUser", idUser).update(updateData);

            res.status(200).json({
                status: "SUCCESS",
                error: null,
                result: "update success"
            })
        } catch (e) {
            console.log(e);
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "Update user failed"
                }
            })
        }
    }
    static async DeleteUserController(req, res, next) {
        try {
            const { id } = req.params;
            await querryBuilder("Customer").where("idUser", id).delete();
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                result: "Delete success"
            })
        } catch (e) {
            console.log(e);
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "Delete user failed"
                }
            })
        }

    }
}
module.exports = CustomerController