const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandControllers");

router.get("/brand/list", brandController.brandList);

module.exports = router;
