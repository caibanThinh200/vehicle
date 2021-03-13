const uuid = require("uuid")
const querryBuilder = require("../Config/Database");
class ManufactorController{
    static async addManufactorController(req,res,next){
        try{
            const {name} = req.body;
            
            const dataInsert = {
                idManufactor:uuid.v4(),
                name
            }
            await querryBuilder("Manufactor").insert(dataInsert);
            res.status(200).json({
                status:"SUCCESS",
                error:null,
                result:"Insert success"
            })
        }
        catch(e){
            console.log(e)
            res.status(400).json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"Insert failed"
                },
                result:null
            })
        }
    }
}
module.exports = ManufactorController