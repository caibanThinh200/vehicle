const uuid = require("uuid");
const querryBuilder = require("../Config/Database");
class BillController {
    static async addBillController(req, res, next) {
        try {
            const {
                idUser,
                total,
                startDate,
                endDate,
                listCar,
                address,
                phoneNum
            } = req.body
            const dataInsert = {
                idBill: uuid.v4(),
                idUser,
                total,
                status: "Waiting for admin",
                place: address,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                phone:phoneNum || "",
                created_at: new Date
            }
            console.log(dataInsert)
            await querryBuilder("Bill").insert(dataInsert);
            if(listCar.length > 0) {
                listCar.forEach(async car => {
                    await querryBuilder("billdetail").insert({
                        idVehicle: car.idVehicle,
                        count: car.count, 
                        idBill: dataInsert.idBill
                    })
                })
            }
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                message:"Add bill success",
                result: dataInsert.idBill 
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
    static async alertDeleveringBill(req, res, next) {
        try {
            const { id } = req.params;
            const { startDate } = req.body;
            const currentTime = new Date();
            const deliveringTime = Math.round(new Date(startDate.replace(/-/g,'/')) - currentTime);
            if (deliveringTime/ 1000 <= -100){
                res.status(400).json({
                    status: "SUCCESS",
                    error: null,
                    message: `Th???i gian giao xe cho h??a ????n ${id} ???? ??i qua`
                })
            }

            else if (deliveringTime/1000 <= 300) {
                res.status(400).json({
                    status: "SUCCESS",
                    error: null,
                    message: `Th???i gian giao xe cho h??a ????n ${id} ???? ?????n`
                })
            }

            else if (deliveringTime/ 1000 >= 1000) {
                res.status(400).json({
                    status: "SUCCESS",
                    error: null,
                    message: `Th???i gian giao xe cho h??a ????n ${id} v???n ch??a ?????n`
                })
            }
        } catch(e) {    
            console.log(e);
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "???? c?? l???i x???y ra"
                },
                result: null
            })
        }
    }

    static async resolveEndTimeController(req, res, next) {
        try {
            const { endDate } = req.query;
            const { id } = req.params;
            const currentTime  = new Date;
            const endTime = new Date(endDate);
            if(Math.abs(currentTime >= endTime)) {
                res.status(200).json({
                    status: "SUCCESS",
                    error: null,
                    message: `Th???i gian thu?? xe c???a h??a ????n h??a ????n ${id} ???? ho??n th??nh`
                })
            }
            else {
                res.status(200).json({
                    status: "SUCCESS",
                    error: null,
                    message: `Th???i gian thu?? xe c???a h??a ????n h??a ????n ${id} v???n ch??a ho??n th??nh`
                })
            }
        } catch(e) {
            console.log(e);
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "???? c?? l???i x???y ra"
                },
                result: null
            })
        }
    }

    static async getBillByIdUserController(req, res, next) {
        try {
            const { idUser } = req.query;
            const bill = await querryBuilder("bill").where("idUser",idUser).select();
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                message: `Tr??? xe th??nh c??ng`,
                bill
            })
        } catch(e) {
            console.log(e);
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "???? c?? l???i x???y ra"
                },
                result: null
            })
        }
    }

    static async adminBillConfirmController(req, res, next) {
        try {
            const { status } = req.body;
            const { id } = req.params;
            
            switch(status) {
                case "In progress": {
                    const car = await querryBuilder("billdetail").where("idBill",id).select("idVehicle","count");
                    const parsedCar = JSON.parse(JSON.stringify(car));
                    parsedCar.map(async car => {
                        const carInfo = await querryBuilder("vehicle").where("idVehicle",car.idVehicle);
                        const parsedCarInfo = JSON.parse(JSON.stringify(carInfo));
                        const quantityUpdate = {
                            quantity: parsedCarInfo[0].quantity - car.count
                        }
                        console.log(quantityUpdate)
                        await querryBuilder("vehicle").where("idVehicle",car.idVehicle).update(quantityUpdate)
                    })
                    break;
                }
                case "Done": {
                    const car = await querryBuilder("billdetail").where("idBill",id).select("idVehicle","count");
                    const parsedCar = JSON.parse(JSON.stringify(car));
                    parsedCar.map(async car => {
                        const carInfo = await querryBuilder("vehicle").where("idVehicle",car.idVehicle);
                        const parsedCarInfo = JSON.parse(JSON.stringify(carInfo));
                        const quantityUpdate = {
                            quantity: parsedCarInfo[0].quantity + car.count,
                            saled: parsedCarInfo[0].saled + car.count
                        }
                        console.log(quantityUpdate)
                        await querryBuilder("vehicle").where("idVehicle",car.idVehicle).update(quantityUpdate)
                    })
                    break;
                }
            }
            await querryBuilder("bill").where("idBill", id).update({status});
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                message: "C???p nh???t h??a ????n th??nh c??ng"
            })
        } catch(e) {    
            console.log(e);
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "???? c?? l???i x???y ra"
                },
                result: null
            })
        }
    }

    static async updateBillStatusController(req,res, next) {
        try {
            const { id } = req.params;
            const updateStatus = {
                status: "In progress"
            }
            await querryBuilder("bill").where("idBill",id).update(updateStatus);
        } catch(e) {
            console.log(e);
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

    static async getBillDetailController(req, res, next) {
        try {
            const { id } = req.params;
            const listVehicle = await querryBuilder("billdetail").where("idBill", id).select("idVehicle");
            const parsedListVehicle = JSON.parse(JSON.stringify(listVehicle));
            const vehiclePromise = parsedListVehicle.map(async vehicle => {
                return new Promise(async (reject,resolve) => {
                    const vehicleData = await querryBuilder("billdetail").where("idVehicle", vehicle.idVehicle).select();
                    resolve(vehicleData)
                })
            })
            const vehicle = await Promise.all(vehiclePromise);
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                vehicle
            })
        } catch(e) {
            console.log(e);
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
            const listVehicle = await querryBuilder("billdetail").where("idBill", id).select("idVehicle");
            const parsedListVehicle = JSON.parse(JSON.stringify(listVehicle));
            const vehiclePromise = parsedListVehicle.map(async vehicle => {
                const vehicleData = await querryBuilder("vehicle").where("idVehicle", vehicle.idVehicle).select().first();
                const parsedData = JSON.parse(JSON.stringify(vehicleData));
                return parsedData;
            })
            const vehicle = await Promise.all(vehiclePromise);
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                vehicle
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

    static async AddNewMonthKPIController(req, res, next) {
        try {
            const { total, percentResult, month, year } = req.body;
            const insertKPI = {
                id: uuid.v4() || "",
                total: total || 0,
                result: percentResult || 0,
                month: month || new Date().getMonth(),
                year: year || new Date().getFullYear()
            }
            await querryBuilder("KPI").insert(insertKPI);
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                result: "KPI added"
            })
        } catch(e) {
            console.log(e);
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "Add KPI failed"
                },
                result: null
            })
        }
    }

    static async GetKPIOfYearByAdminController(req, res, next) {
        try {
            const { year } = req.query;
            const data = await querryBuilder("KPI").where("year", year).select();
            res.status(200).json({
                status: "SUCCESS",
                error: null,
                data
            })
        } catch(e) {
            console.log(e);
            res.status(400).json({
                status: "FAILED",
                error: {
                    code: 1000,
                    message: "Get KPI failed"
                },
                result: null
            })
        }
    }
}
module.exports = BillController

