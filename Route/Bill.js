const route = require("express").Router();
const BillController = require("../Controller/BillController");

route.post("/", BillController.addBillController);
route.get("/",BillController.getBillController);
route.get("/user", BillController.getBillByIdUserController);
route.delete("/:id", BillController.deleteBillController);
route.put("/:id", BillController.updateBillStatusController);
route.put("/admin/confirm/:id",BillController.adminBillConfirmController);
route.get("/endTime/:id", BillController.resolveEndTimeController);
route.delete("/:id", BillController.deleteBillController);
route.post("/KPI", BillController.AddNewMonthKPIController);
route.get("/KPI", BillController.GetKPIOfYearByAdminController);
route.get("/:id", BillController.getBillByIdController);
route.get("/:page", BillController.paginatingBillController);
route.get("/alert/:id", BillController.alertDeleveringBill);

module.exports = route
