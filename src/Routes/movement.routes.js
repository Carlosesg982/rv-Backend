const express = require("express");
const router = express.Router();
const movementController = require("../controllers/movementControllers");

router.post("/movements", movementController.movementAdd);

module.exports = router;
