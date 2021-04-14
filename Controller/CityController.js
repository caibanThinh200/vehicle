const querry = require("../Config/Database");
const uuid = require("uuid");
class CityController {
    static async addCityController(req, res, next) {
        try {
            const { name, code } = req.body;
            const insertCity = {
                name,
                code
            }
            await querry("City").insert(insertCity);
            res.json({
                status: "SUCCESS",
                error: null,
                result: "Add city success"
            })
        } catch (e) {
            console.log(e);
            res.json({
                status: "FAILED",
                err: {
                    code: 1000,
                    message: "Add city failed"
                },
                result: null
            });
        }
    }
    static async getCityController(req, res, next) {
        try {
            const cities = await querry("City").select();
            res.json({
                status: "SUCCESS",
                error: null,
                cities
            })
        } catch (e) {
            console.log(e);
            res.json({
                status: "FAILED",
                err: {
                    code: 1000,
                    message: "Get city failed"
                },
                result: null
            });
        }
    }
}
module.exports = CityController