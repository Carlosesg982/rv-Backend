const BrandModel = require("../models/brandModel");

exports.brandList = (req, res) => {
  BrandModel.brandList()
    .then((result) => {
      res.status(200).json(result || []);
    })
    .catch((err) => {
      console.error("Error getting user list:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};
