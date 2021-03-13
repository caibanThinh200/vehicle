const route = require("express").Router();
const CustomerController = require('../Controller/CustomerController');
route.post("/",CustomerController.RegisterController);
route.post("/login",CustomerController.LoginController);
module.exports = route