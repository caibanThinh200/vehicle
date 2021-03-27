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
                result:"Add category success"
            })
        }
        catch(e){
            console.log(e);
            res.status(400).json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"Add category failed"
                },
                result:null
            })
        }
    }
    static async getCategoryController(req,res,next){
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
                    message:"get category failed"
                },
                result:null
            })
        }
    }
    static async paginatingCategoryController(req,res,next){
        try{
            const {page} = req.params;
            const category = 12;
            let startIndex = (page - 1)*category;
            let endIndex = page * category;
            const categoryList = await querry("Category").select();
            const list = categoryList.slice(startIndex,endIndex);
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
    static async getCategoryByIdController(req,res,next){
        try{
            const {id} = req.params;
            const product = await querry("Category").where("idCategory",id).select().first()
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
                    message:"get category failed"
                },
                result:null
            })
        }
    }
    static async deleteCategoryController(req,res,next){
        try{
            const {id} = req.params;
            await querry("Category").where("idCategory",id).del();
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
                    message:"delete category failed"
                },
                result:null
            })
        }
    }
    static async updateCategoryController(req,res,next){
        try{
            const {id} = req.params;
            const{name} = req.body;
            await querry("Category").where("idCategory",id).update({name});
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
                    message:"update category failed"
                },
                result:null
            })
        }
    }
}
module.exports = CategoryController;