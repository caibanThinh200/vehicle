const route = require("express").Router();
const CityController = require("../Controller/CityController");

route.post("/",CityController.addCityController);
route.get("/",CityController.getCityController);

module.exports = route;