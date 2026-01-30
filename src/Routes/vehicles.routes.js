const express = require("express");
const router = express.Router();
const vehiclesController = require("../controllers/vehiclesControllers");

router.get("/vehicles/list", vehiclesController.vehiclesList);

module.exports = router;
