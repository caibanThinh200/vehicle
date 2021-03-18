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
    static async paginatingProductController(req,res,next){
        try{
            const {page} = req.params;
            const product = 12;
            let startIndex = (page - 1)*product;
            let endIndex = page * product;
            const productList = await querry("Manufactor").select();
            const list = productList.slice(startIndex,endIndex);
            res.status(200).json({
                status:"SUCCESS",
                error:null,
                data:list
            })
        }
        catch(e){
            res.status(400).json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"paginating failed"
                },
                result:null
            })
        }
    }
    static async getProductByIdController(req,res,next){
        try{
            const {id} = req.params;
            const product = await querry("Manufactor").where("idManufactor",id).select().first()
            res.status(200).json({
                status:"SUCCESS",
                error:null,
                data:product
            })
        }
        catch(e){
            console.log(e);
            res.status(400).json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"get product failed"
                },
                result:null
            })
        }
    }
    static async deleteController(req,res,next){
        try{
            const {id} = req.params;
            await querry("Manufactor").where("idManufactor",id).del();
            res.status(200).json({
                status:"SUCCESS",
                error:null,
                result:"Deleted"
            })
        }
        catch(e){
            console.log(e);
            res.status(400).json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"delete product failed"
                },
                result:null
            })
        }
    }
    static async updateProductController(req,res,next){
        try{
            const {id} = req.params;
            const{name} = req.body;
            await querry("Manufactor").where("idManufactor",id).update({name});
            res.status(200).json({
                status:"SUCCESS",
                error:null,
                result:"Updated"
            })
        }
        catch(e){
            console.log(e);
            res.status(400).json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"update product failed"
                },
                result:null
            })
        }
    }
}
module.exports = ManufactorController