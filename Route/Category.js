const route = require("express").Router();
const CategoryController = require("../Controller/CategoryController");
route.post("/", CategoryController.addCategoryController);
route.get("/",CategoryController.getCategoryController);
module.exports = route;