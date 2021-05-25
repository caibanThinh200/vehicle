const route = require("express").Router();
const BillController = require("../Controller/BillController");
route.post("/", BillController.addBillController);
route.get("/",BillController.getBillController);
route.get("/:id", BillController.getBillController);
route.delete("/:id", BillController.deleteBillController);
route.get("/:page", BillController.paginatingBillController);
module.exports = route
