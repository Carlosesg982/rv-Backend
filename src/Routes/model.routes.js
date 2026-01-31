const express = require("express");
const router = express.Router();
const ModelController = require("../controllers/modelControllers");

router.get("/model/list", ModelController.modelList);

module.exports = router;
