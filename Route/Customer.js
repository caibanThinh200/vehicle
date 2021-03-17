const route = require("express").Router();
const CustomerController = require('../Controller/CustomerController');
route.post("/",CustomerController.RegisterController);
route.post("/login",CustomerController.LoginController);
route.get("/:id",CustomerController.GetUserByIdController);
route.get("/user/info",CustomerController.GetUserByTokenController);
route.put("/:id",CustomerController.UpdateUserInfoController);
route.delete("/:id",CustomerController.DeleteUserController);
module.exports = route