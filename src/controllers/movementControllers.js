const MovementModel = require("../models/movementModel");

exports.movementAdd = (req, res) => {
  const { id_Vehicles, movements, motorcyclist, mileage } = req.body;

  if (!id_Vehicles || !movements || !motorcyclist || !mileage) {
    return Response.json(
      { error: "Todos los campos son obligatorios" },
      { status: 400 },
    );
  }

  if (isNaN(Number(id_Vehicles))) {
    return Response.json(
      { error: "Los IDs deben ser numéricos" },
      { status: 400 },
    );
  }

  MovementModel.movementAdd(id_Vehicles, movements, motorcyclist, mileage)
    .then((result) => {
      if (result === null) {
        return res.status(401).json({
          movement: null,
        });
      }

      res.status(200).json({
        movement: result,
      });
    })
    .catch((err) => {
      console.error("Error adding movement:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};

exports.movementList = (req, res) => {
  const { motorcyclist, id_vehicles, created_at } = req.body;

  if (isNaN(Number(id_vehicles))) {
    return Response.json(
      { error: "Los IDs debe ser numérico" },
      { status: 400 },
    );
  }

  MovementModel.movementList(motorcyclist, id_vehicles, created_at)
    .then((result) => {
      if (result === null) {
        return res.status(401).json({
          movements: null,
        });
      }
      res.status(200).json({
        movements: result,
      });
    })
    .catch((err) => {
      console.error("Error listing movements:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};
