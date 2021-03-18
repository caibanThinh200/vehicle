const uuid = require("uuid");
const querryBuilder = require("../Config/Database");
class CategoryController {
    static async addCategoryController(req,res,next){
        try{
            const {name} = req.body
            const dataInsert = {
                idCategory:uuid.v4(),
                nameCate:name
            }
            await querryBuilder("Category").insert(dataInsert);
            res.status(200).json({
                status:"SUCCESS",
                error:null,
                result:"Add success"
            })
        }
        catch(e){
            console.log(e);
            res.status(400).json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"Add failed"
                },
                result:null
            })
        }
    }
    static async getCatagoryController(req,res,next){
        try{
            const data = await querry("Category").select();
            res.status(200).json({
                status:"SUCCESS",
                error:null,
                data
            })
        }
        catch(e){
            console.log(e);
            res.status(400).json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"getcatagory failed"
                },
                result:null
            })
        }
    }
    static async paginatingCatagoryController(req,res,next){
        try{
            const {page} = req.params;
            const product = 12;
            let startIndex = (page - 1)*product;
            let endIndex = page * product;
            const productList = await querry("Catagory").select();
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
            const product = await querry("Catgory").where("idCatagory",id).select().first()
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
            await querry("Catagory").where("idCatagory",id).del();
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
            await querry("Catagory").where("idCatagory",id).update({name});
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
module.exports = CategoryController;