const querry = require("../Config/Database")
const uuid = require("uuid");

class VehicleController {
    static async addVehicleController(req, res, next) {
        try {
            const {
                name,
                quantity,
                price,
                saled,
                count,
                idCategory,
                idManufactor
            } = req.body
            const dataInsert = {
                idVehicle: uuid.v4(),
                name,
                quantity,
                price,
                idCategory,
                idManufactor
            }
            await querry("Vehicle").insert(dataInsert)
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                result: "Add success"
            })
        }
        catch (e) {
            console.log(e)
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "Insert failed"
                },
                result: null
            })
        }
    }
    static async getProductController(req, res, next) {
        try {
            const data = await querry("Vehicle").select().orderBy("created_at","desc");
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                data
            })
        }
        catch (e) {
            console.log(e);
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "get product failed"
                },
                result: null
            })
        }
    }
    static async paginatingProductController(req, res, next) {
        try {
            const { page } = req.params;
            const product = 12;
            let startIndex = (page - 1) * product;
            let endIndex = page * product;
            const productList = await querry("Vehicle").select();
            const list = productList.slice(startIndex, endIndex);
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                data: list
            })
        }
        catch (e) {
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "paginating failed"
                },
                result: null
            })
        }
    }
    static async getProductByIdController(req, res, next) {
        try {
            const { id } = req.params;
            const product = await querry("Vehicle").where("idVehicle", id).select().first()
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                data: product
            })
        }
        catch (e) {
            console.log(e);
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "get product failed"
                },
                result: null
            })
        }
    }
    static async deleteController(req, res, next) {
        try {
            const { id } = req.params;
            await querry("Vehicle").where("idVehicle", id).del();
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                result: "Deleted"
            })
        }
        catch (e) {
            console.log(e);
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "delete product failed"
                },
                result: null
            })
        }
    }
    static async updateProductController(req, res, next) {
        try {
            const { id } = req.params;
            const { name, quantity, price, idCategory, idManufactor } = req.body;
            await querry("Vehicle").where("idVehicle", id).update({ name, quantity, price, idCategory, idManufactor });
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                result: "Updated"
            })
        }
        catch (e) {
            console.log(e);
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "update product failed"
                },
                result: null
            })
        }
    }
    static async addAvailableVehicle(req, res, next) {
        try {
            const { idVehicle, idCity } = req.body;
            const insertData = {
                idVehicle,
                idCity
            }
            await querry("AvailableVehicle").insert(insertData);
            res.json({
                status: "SUCCESS",
                error: null,
                result: "Add vehicle success"
            })
        } catch (e) {
            console.log(e);
            res.json({
                status: "FAILED",
                err: {
                    code: 1000,
                    message: "Add vehicle failed"
                },
                result: null
            });
        }
    }
    static async getAvailableVehicle(req, res, next) {
        try {
            const { idCity } = req.body;
            const vehicles = await querry("AvailableVehicle").where("idCity", idCity).select();
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                vehicles
            })
        } catch (e) {
            console.log(e);
            res.json({
                status: "FAILED",
                err: {
                    code: 1000,
                    message: "Get vehicle failed"
                },
                result: null
            });
        }
    }
}
module.exports = VehicleController

