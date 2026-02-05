const VehiclesModel = require("../models/vehiclesModel");

exports.vehiclesList = async (req, res) => {
  try {
    const result = await VehiclesModel.vehiclesList();
    res.status(200).json({
      vehiclesList: result,
    });
  } catch (err) {
    console.error("Error getting vehicle list:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.vehiclesAdd = async (req, res) => {
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

  try {
    const result = await VehiclesModel.vehiclesAdd(id_brand, id_model, plate);
    if (result === null) {
      return res.status(401).json({
        vehicle: null,
      });
    }

    res.status(200).json({
      vehicle: result,
    });
  } catch (err) {
    console.error("Error adding vehicle:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.vehiclesDelete = async (req, res) => {
  const { id_vehicle } = req.params;

  if (!id_vehicle) {
    return Response.json(
      { error: "Este campo es obligatorio" },
      { status: 400 },
    );
  }

  if (isNaN(Number(id_vehicle))) {
    return Response.json({ error: "El ID debe ser numérico" }, { status: 400 });
  }

  try {
    const result = await VehiclesModel.vehiclesDelete(id_vehicle);
    if (result === null) {
      return res.status(401).json({
        isDelete: null,
      });
    }

    res.status(200).json({
      isDelete: result,
    });
  } catch (err) {
    console.error("Error deleting vehicle:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.vehiclesUpdate = async (req, res) => {
  const { id_vehicle } = req.params;
  const { id_brand, id_model, plate } = req.body;

  if (!id_vehicle || !id_brand || !id_model || !plate) {
    return Response.json(
      { error: "Todos los campos son obligatorios" },
      { status: 400 },
    );
  }

  if (
    isNaN(Number(id_vehicle)) ||
    isNaN(Number(id_brand)) ||
    isNaN(Number(id_model))
  ) {
    return Response.json(
      { error: "Los IDs deben ser numéricos" },
      { status: 400 },
    );
  }

  try {
    const result = await VehiclesModel.vehiclesUpdate(
      id_vehicle,
      id_brand,
      id_model,
      plate,
    );
    if (result === null) {
      return res.status(401).json({
        vehicle: null,
      });
    }

    res.status(200).json({
      vehicle: result,
    });
  } catch (err) {
    console.error("Error updating vehicle:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
