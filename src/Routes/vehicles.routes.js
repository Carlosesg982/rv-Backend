const express = require("express");
const router = express.Router();
const vehiclesController = require("../controllers/vehiclesControllers");

router.get("/vehicles/list", vehiclesController.vehiclesList);
router.post("/vehicles", vehiclesController.vehiclesAdd);
router.delete("/vehicles/:id_vehicle", vehiclesController.vehiclesDelete);
router.put("/vehicles", vehiclesController.vehiclesUpdate);

module.exports = router;
