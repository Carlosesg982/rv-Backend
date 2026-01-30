const VehiclesModel = require("../models/vehiclesModel");

exports.vehiclesList = (req, res) => {
  VehiclesModel.vehiclesList()
    .then((result) => {
      if (result === null) {
        return res.status(401).json({
          vehiclesList: null,
        });
      }
      res.status(200).json({
        vehiclesList: result,
      });
    })
    .catch((err) => {
      console.error("Error getting user list:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};
