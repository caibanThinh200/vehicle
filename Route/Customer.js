const route = require("express").Router();
const CustomerController = require('../Controller/CustomerController');
const upload = require("../multer");

const UserValidation = require("../Middleware/UserAuth");
route.post("/", CustomerController.RegisterController);
route.post("/login", CustomerController.LoginController);
route.get("/:id", CustomerController.GetUserByIdController);
route.get("/user/info", CustomerController.GetUserByTokenController);
route.put("/:id",upload.single("image"), CustomerController.UpdateUserInfoController);
route.delete("/:id", CustomerController.DeleteUserController);
module.exports = route