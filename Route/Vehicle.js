const route = require("express").Router();
const UserAuth = require("../Middleware/UserAuth");
const upload = require("../multer");
const VehicleController = require("../Controller/VehicleController");

route.post("/", VehicleController.addVehicleController);
route.get("/", VehicleController.getProductController);
route.get("/:page", VehicleController.paginatingProductController);
route.get("/detail/:id", VehicleController.getProductByIdController);
route.delete("/:id", VehicleController.deleteController);
route.put("/:id", VehicleController.updateProductController);
route.post("/description/:idVehicle", VehicleController.addVehicleDescriptionsController);
route.get("/description/:idVehicle", VehicleController.getVehicleDescriptionController);
route.get("/image/:idVehicle", VehicleController.getVehicleImagesController);
route.post("/image/:idVehicle", upload.single("image"), VehicleController.addVehicleImagesController);
route.post("/available", VehicleController.addAvailableCarInCity);
route.get("/available/:idCity", VehicleController.getAvailableCarByCity);

module.exports = route;
