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

}
module.exports = CategoryController;