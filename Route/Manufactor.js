const route = require("express").Router();
const ManufactorController = require("../Controller/ManufactorController");
route.post("/", ManufactorController.addManufactorController);
route.get("/",ManufactorController.getManufactorsController);
route.put("/:id", ManufactorController.updateManufactorController);
route.get("/:id", ManufactorController.getManufactorByIdController);
route.delete("/:id", ManufactorController.deleteManufactorController);
route.get("/:page", ManufactorController.paginatingManufactorController);
module.exports = route