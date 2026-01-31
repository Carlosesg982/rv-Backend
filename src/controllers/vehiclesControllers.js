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
      console.error("Error getting vehicle list:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};

exports.vehiclesAdd = (req, res) => {
  const { id_brand, id_model, plate } = req.body;

  if (!id_brand || !id_model || !plate) {
    return Response.json(
      { error: "Todos los campos son obligatorios" },
      { status: 400 },
    );
  }

  if (isNaN(Number(id_brand)) || isNaN(Number(id_model))) {
    return Response.json(
      { error: "Los IDs deben ser numéricos" },
      { status: 400 },
    );
  }

  VehiclesModel.vehiclesAdd(id_brand, id_model, plate)
    .then((result) => {
      if (result === null) {
        return res.status(401).json({
          vehicle: null,
        });
      }

      res.status(200).json({
        vehicle: result,
      });
    })
    .catch((err) => {
      console.error("Error adding vehicle:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};
