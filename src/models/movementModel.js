const pool = require("../config/database");

const MovementModel = {
  movementAdd: async (id_Vehicles, movements, motorcyclist, mileage) => {
    try {
      const [results] = await pool.query(
        "CALL sp_register_movement_add(?, ?, ?, ?)",
        [id_Vehicles, movements, motorcyclist, mileage],
      );

      const rows = results && results[0];

      if (!rows || !Array.isArray(rows) || rows.length === 0) {
        return null;
      }

      const vehicle = rows.map((row) => ({
        id: row.id,
        id_Vehicles: row.id_Vehicles,
        movements: row.movements,
        motorcyclist: row.motorcyclist,
        mileage: row.mileage,
        created_at: row.created_at,
      }));

      return vehicle;
    } catch (error) {
      throw error;
    }
  },
  movementList: async (motorcyclist, id_vehicles, created_at) => {
    try {
      const [results] = await pool.query(
        "CALL sp_register_movement_list(?, ?, ?)",
        [motorcyclist, id_vehicles, created_at],
      );

      const rows = results && results[0];

      if (!rows || !Array.isArray(rows) || rows.length === 0) {
        return null;
      }

      const movements = rows.map((row) => ({
        id: row.id,
        vehicle: {
          id: row.vehicle_id,
          plate: row.Plate,
          brand: row.brand_name,
          model: row.model_name,
        },
        movements: row.movements,
        motorcyclist: row.motorcyclist,
        mileage: row.mileage,
        created_at: row.created_at,
      }));

      return movements;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = MovementModel;
