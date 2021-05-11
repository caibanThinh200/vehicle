const route = require("express").Router();
const ManufactorController = require("../Controller/ManufactorController");

route.post("/", ManufactorController.addManufactorController);
route.get("/", ManufactorController.getManufactorsController);
module.exports = route;
