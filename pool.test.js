const knex = require("./Config/Database");
const vehicle = require("./Controller/VehicleController");
function sum(a, b) {
  return a + b;
}
console.log(vehicle.getProductController);
test("check vehicle request 01", () => {
  expect(vehicle.getProductController()).toBe(123);
})
