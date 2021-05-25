const uuid = require("uuid");
const querryBuilder = require("../Config/Database");
class BillController {
    static async addBillController(req, res, next) {
        try {
            const {
                idUser,
                total,
                timeCount
            } = req.body
            const dataInsert = {
                idBill: uuid.v4(),
                idUser,
                total,
                timeCount,
                created_at: new Date
            }
            await querryBuilder("Bill").insert(dataInsert);
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                result: "Add bill success"
            })
        }
        catch (e) {
            console.log(e);
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "Add bill failed"
                },
                result: null
            })
        }
    }
    static async getBillController(req, res, next) {
        try {
            const data = await querryBuilder("Bill").select();
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
                    message: "get bill failed"
                },
                result: null
            })
        }
    }
    static async paginatingBillController(req, res, next) {
        try {
            const { page } = req.params;
            const bill = 12;
            let startIndex = (page - 1) * bill;
            let endIndex = page * bill;
            const billList = await querryBuilder("Bill").select();
            const list = billList.slice(startIndex, endIndex);
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
    static async getBillByIdController(req, res, next) {
        try {
            const { id } = req.params;
            const bill = await querryBuilder("Bill").where("idBill", id).select().first()
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                data: bill
            })
        }
        catch (e) {
            console.log(e);
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "get bill failed"
                },
                result: null
            })
        }
    }
    static async deleteBillController(req, res, next) {
        try {
            const { id } = req.params;
            await querryBuilder("Bill").where("idBill", id).del();
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
                    message: "delete bill failed"
                },
                result: null
            })
        }
    }
}
module.exports = BillController

