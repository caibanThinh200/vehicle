const route = require("express").Router();
const ManufactorController = require("../Controller/ManufactorController");
route.post("/",ManufactorController.addManufactorController)
module.exports = route