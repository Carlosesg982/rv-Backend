const BrandModel = require("../models/brandModel");

exports.brandList = (req, res) => {
  BrandModel.brandList()
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(result));
    })
    .catch((err) => {
      console.error("Error getting user list:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};
