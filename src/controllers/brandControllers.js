const BrandModel = require("../models/brandModel");

exports.brandList = (req, res) => {
  BrandModel.brandList()
    .then((result) => {
      if (result === null) {
        return res.status(401).json({
          brandList: null,
        });
      }
      res.status(200).json({
        brandList: result,
      });
    })
    .catch((err) => {
      console.error("Error getting user list:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};
