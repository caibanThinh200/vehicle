const uuid = require("uuid");
const querry = require("../Config/Database");
class CityController {
    static async addCityController(req, res, next) {
        try {
            const { name, code } = req.body;
            const filename = req.file ? req.file.filename : "";
            const insertData = {
                id: uuid.v4(),
                name,
                code,
                images: filename,
                created_at: new Date
            }
            await querry("City").insert(insertData);
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                result: "add success"
            })
        } catch (e) {
            console.log(e);
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "add failed"
                }
            })
        }
    }
    static async getCityController(req, res, next) {
        try {
            const cities = await querry("City").select();
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                cities
            })
        } catch (e) {
            console.log(e);
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "get cities failed"
                }
            })
        }
    }
    static async updateCityController(req, res, next) {
        try {
            const { idCity } = req.params;
            const { name, code } = req.body;
            const filename = req.file ? req.file.filename : ""
            const updateData = {
                name,
                code,
                images: filename,
                created_at: new Date
            }
            await querry("City").where("idCity", idCity).update(updateData);
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
                    message: "update city failed"
                }
            })
        }
    }
}
module.exports = CityController;
