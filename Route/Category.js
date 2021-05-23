const route = require("express").Router();
const CategoryController = require("../Controller/CategoryController");
route.post("/", CategoryController.addCategoryController);
route.get("/", CategoryController.getCategoryController);
route.put("/:id", CategoryController.updateCategoryController);
route.get("/:id", CategoryController.getCategoryByIdController);
route.delete("/:id", CategoryController.deleteCategoryController);
route.get("/:page", CategoryController.paginatingCategoryController);
module.exports = route;