const route = require("express").Router();
const upload = require("../multer");
const CityController = require("../Controller/CityController");

route.post("/",upload.single("image"),CityController.addCityController);
route.get("/",CityController.getCityController);
route.put("/:idCity",upload.single("image"),CityController.updateCityController);

module.exports=route;