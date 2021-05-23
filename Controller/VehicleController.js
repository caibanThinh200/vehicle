const querry = require("../Config/Database");
const uuid = require("uuid");

class VehicleController {
  static async addVehicleController(req, res, next) {
    try {
      const { name, quantity, price, saled, count, idCategory, idManufactor , image} =
        req.body;
      const filename = req.file.filename ? req.file.filename : "";
      const dataInsert = {
        idVehicle: uuid.v4(),
        name: name || "",
        quantity: quantity || "",
        price: price || "",
        idCategory: idCategory || "",
        idManufactor: idManufactor || "",
        avatar: image || ""
      };
      await querry("Vehicle").insert(dataInsert);
      res.status(200).json({
        status: "SUCCESS",
        error: null,
        result: "Add success",
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "Insert failed",
        },
        result: null,
      });
    }
  }
  static async getProductController(req, res, next) {
    try {
      const data = await querry("Vehicle").select();
      res.status(200).json({
        status: "SUCCESS",
        error: null,
        data,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "get product failed",
        },
        result: null,
      });
    }
  }
  static async paginatingProductController(req, res, next) {
    try {
      const { page } = req.params;
      const product = 12;
      let startIndex = (page - 1) * product;
      let endIndex = page * product;
      const productList = await querry("Vehicle").select();
      const list = productList.slice(startIndex, endIndex);
      res.status(200).json({
        status: "SUCCESS",
        error: null,
        data: list,
      });
    } catch (e) {
      res.status(400).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "paginating failed",
        },
        result: null,
      });
    }
  }
  static async getProductByIdController(req, res, next) {
    try {
      const { id } = req.params;
      const product = await querry("Vehicle")
        .where("idVehicle", id)
        .select()
        .first();
      res.status(200).json({
        status: "SUCCESS",
        error: null,
        data: product,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "get product failed",
        },
        result: null,
      });
    }
  }
  static async deleteController(req, res, next) {
    try {
      const { id } = req.params;
      await querry("Vehicle").where("idVehicle", id).del();
      res.status(200).json({
        status: "SUCCESS",
        error: null,
        result: "Deleted",
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "delete product failed",
        },
        result: null,
      });
    }
  }
  static async updateProductController(req, res, next) {
    try {
      const { id } = req.params;
      const { name, quantity, price, idCategory, idManufactor } = req.body;
      const filename = req.file ? req.file.filename : "";
      const car = JSON.parse(
        JSON.stringify(
          await querry("Vehicle").where("idVehicle", id).select().first()
        )
      );
      const updateCar = {
        name,
        quantity,
        price,
        idCategory: idCategory === "" ? car.idCategory : idCategory,
        idManufactor: idManufactor === "" ? car.idManufactor : idManufactor,
        image: filename,
        created_at: new Date(),
      };
      console.log(updateCar);
      await querry("Vehicle").where("idVehicle", id).update(updateCar);
      res.status(200).json({
        status: "SUCCESS",
        error: null,
        result: "Updated",
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "update product failed",
        },
        result: null,
      });
    }
  }
  static async addVehicleDescriptionsController(req, res, next) {
    try {
      const { idVehicle } = req.params;
      const { description } = req.body;
      const insertDescription = {
        id: uuid.v4(),
        idVehicle,
        description,
        created_at: new Date(),
      };
      await querry("VehicleDetail").insert(insertDescription);
      res.status(200).json({
        status: "SUCCESS",
        error: null,
        result: "Description added",
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "added description failed",
        },
        result: null,
      });
    }
  }
  static async getVehicleDescriptionController(req, res, next) {
    try {
      const { idVehicle } = req.params;
      const descriptions = await querry("VehicleDetail")
        .where("idVehicle", idVehicle)
        .select();
      res.status(200).json({
        status: "SUCCESS",
        error: null,
        descriptions,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "get description failed",
        },
        result: null,
      });
    }
  }
  static async addVehicleImagesController(req, res, next) {
    try {
      const { idVehicle } = req.params;
      const filename = req.file ? req.file.filename : "";
      const insertImage = {
        id: uuid.v4(),
        idVehicle,
        path: filename,
        created_at: new Date(),
      };
      await querry("Images").insert(insertImage);
      res.status(200).json({
        status: "SUCCESS",
        error: null,
        result: "Images added",
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "add images failed",
        },
        result: null,
      });
    }
  }
  static async getVehicleImagesController(req, res, next) {
    try {
      const { idVehicle } = req.params;
      const images = await querry("Images")
        .where("idVehicle", idVehicle)
        .select();
      res.status(200).json({
        status: "SUCCESS",
        error: null,
        images,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "get images failed",
        },
        result: null,
      });
    }
  }
  static async addAvailableCarInCity(req, res, next) {
    try {
      const { idCity, idVehicle } = req.body;
      const insertVehicle = {
        idCity,
        idVehicle,
      };
      await querry("AvailableVehicle").insert(insertVehicle);
      res.status(200).json({
        status: "SUCCESS",
        error: null,
        result: "Vehicle added",
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "add vehicle failed",
        },
        result: null,
      });
    }
  }
  static async getAvailableCarByCity(req, res, next) {
    try {
      const { idCity } = req.params;
      const availableCar = await querry("AvailableVehicle")
        .where("idCity", idCity)
        .select();
      const carIds = availableCar.map(async (item) => {
        const carId = JSON.parse(JSON.stringify(item)).idVehicle;
        const carInf = await querry("Vehicle")
          .where("idVehicle", carId)
          .select()
          .first();
        return carInf;
      });
      const carInfs = JSON.parse(JSON.stringify(await Promise.all(carIds)));
      res.status(200).json({
        status: "SUCCESS",
        error: null,
        carInfs,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "get vehicle failed",
        },
        result: null,
      });
    }
  }
}
module.exports = VehicleController;
