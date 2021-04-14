const route = require("express").Router();
const UserAuth = require("../Middleware/UserAuth");
const VehicleController = require("../Controller/VehicleController");
route.post("/", VehicleController.addVehicleController);
route.get("/", VehicleController.getProductController);
route.get("/:page", VehicleController.paginatingProductController)
route.get("/detail/:id", VehicleController.getProductByIdController)
route.delete("/:id", VehicleController.deleteController)
route.put("/:id", VehicleController.updateProductController);
route.post("/city", VehicleController.addAvailableVehicle);
route.get("/available/place", VehicleController.getAvailableVehicle);
module.exports = route;