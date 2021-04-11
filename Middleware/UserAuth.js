const e = require("express");
const jwt = require("jsonwebtoken");
const querryBuilder = require("../Config/Database");
const JWT_SECRET_KEY= process.env.JWT_SECRET_KEY;
module.exports = async(req,res,next) =>{
    try{
        if(req.header("Authorization")){
            const token = req.header("Authorization").replace("Bearer ","");
            if(token){
                const verifyToken =await jwt.verify(token,JWT_SECRET_KEY);
            
                if(verifyToken){
                    const {idUser} = verifyToken
                
                    const user = await querryBuilder("Customer").where("idUser",idUser).first();
                    const {fullname,license,mail,phoneNum,birth,avatar,cmnd,password,created_at} = JSON.parse(JSON.stringify(user));
                    if (fullname == null) 
                    {
                        res.status(400).json({
                            message:"Invalid fullname"
                        })                      
                    }
                    if (license == null) {
                        res.status(400).json({
                            message:"Invalid license"
                        })
                    }
                    if (mail==null || email.value != /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) 
                    {
                        res.status(400).json({
                            message:"Invalid email"
                        })
                    }

                    if (phoneNum == null || phoneNum.value != /^\d{10}$/) 
                    {
                        res.status(400).json({
                            message:"Invalid phone number"
                        })
                    }
                    if (birth == null) {
                        res.status(400).json({
                            message:"Invalid birthday"
                        })
                    }
                    if (avatar == null) {
                        res.status(400).json({
                            message:"Invalid avatar"
                        })
                    }
                    if (cmnd == null || cmnd.value != /^\d{11}$/ ) {
                        res.status(400).json({
                            message:"Invalid Identity Card"
                        })
                    }
                    if (password == null|| password.value !=/^[A-Za-z]\w{7,14}$/) 
                    {
                        res.status(400).json({
                            message:"Invalid password"
                        })
                    }
                    

                    next();
                }
            }
        } else {
            res.status(400).json({
                message: "You need account to get next action"
            })
        }
    } catch (e) {
        console.log(e)
        res.status(400).JSON({
            message: "You need account to get next action"
        })
    }
}