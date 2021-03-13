const querryBuilder= require("../Config/Database")
const uuid = require("uuid")
const jwt= require("jsonwebtoken")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const bcrypt = require("bcrypt");
class CustomerController{
    static async RegisterController(req,res,next){
        try{
            const {
            fullname,
            license,
            mail,
            phoneNum,
            birth,
            cmnd,
            password
        } = req.body
        
        const userInsert = {
            idUser:uuid.v4(),
            fullname,
            license,
            mail,
            phoneNum,
            birth,
            cmnd,
            password:bcrypt.hashSync(password,10),
            created_at:new Date()
        }
        await querryBuilder("Customer").insert(userInsert);
        res.status(200).json({
                status:"SUCCESS",
                error:null,
                result:"Registered"
            })
        }
        catch(e){
            res.status(400).json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"insert failed: " + e
                }
                
            })
        }
    }
    static async LoginController(req,res,next){
        try{
            const {
                email,
                password
            } = req.body;
            const userAccount = await querryBuilder("Customer").where("mail",email).select().first();
            const user = (JSON.parse(JSON.stringify(userAccount)));
            const {idUser,fullname,license,mail,phoneNum,birth,avatar,cmnd,created_at} = user
            if(!user || !bcrypt.compareSync(password,user.password)){
                res.status(200).json({
                    message:"Invalid mail or password"
                })
            }
            else {
                const token = jwt.sign({idUser,fullname,license,mail,phoneNum,birth,avatar,cmnd,created_at},JWT_SECRET_KEY,{expiresIn:60*60*24});
               res.status(200).json({
                   status:"SUCCESS",
                   error:null,
                   data:token
               })
            }
        }catch(e){
            res.status(400).json({
                message:"Invalid mail or password"
            })
        }
    }
}
module.exports = CustomerController