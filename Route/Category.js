const route = require("express").Router();
const CategoryController = require("../Controller/CategoryController");
route.post("/",CategoryController.addCategoryController);
module.exports = route;