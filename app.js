const app = require("express")();
const bodyParser = require("body-parser")
//middleware
require('dotenv').config()
const cors = require("cors");
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//route 
const vehicleRouter = require("./Route/Vehicle");
const customerRouter = require("./Route/Customer");
const manufactorRouter = require("./Route/Manufactor");
const categoryRouter = require("./Route/Category");
const cityRoute = require("./Route/City");

app.use("/customer", customerRouter);
app.use("/vehicle", vehicleRouter);
app.use("/manufactor", manufactorRouter);
app.use("/cate", categoryRouter);
app.use("/city", cityRoute);

//API invalid
app.get("*", (req, res) => {
    res.json("API not found")
})
module.exports = app