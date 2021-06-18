const route = require("express").Router();
const BillController = require("../Controller/BillController");

route.post("/", BillController.addBillController);
route.get("/",BillController.getBillController);
route.get("/user", BillController.getBillByIdUserController);
route.get("/:id", BillController.getBillByIdController);
route.delete("/:id", BillController.deleteBillController);
route.get("/:page", BillController.paginatingBillController);
route.get("/alert/:id", BillController.alertDeleveringBill);
route.put("/:id", BillController.updateBillStatusController);
route.put("/admin/confirm/:id",BillController.adminBillConfirmController);
route.get("/endTime/:id", BillController.resolveEndTimeController);
route.delete("/:id", BillController.deleteBillController);
route.post("/KPI", BillController.AddNewMonthKPIController);

module.exports = route
