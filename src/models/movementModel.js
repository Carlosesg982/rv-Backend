const db = require("../services/dbConnection");

const MovementModel = {
  movementAdd: (id_Vehicles, movements, motorcyclist, mileage) => {
    return new Promise((resolve, reject) => {
      db.query(
        "CALL sp_register_movement_add(?, ?, ?, ?)",
        [id_Vehicles, movements, motorcyclist, mileage],
        (err, results) => {
          if (err) {
            return reject(err);
          }

          const rows = results && results[0];

          if (!rows || !Array.isArray(rows) || rows.length === 0) {
            return resolve(null);
          }

          const vehicle = rows.map((row) => ({
            id: row.id,
            id_Vehicles: row.id_Vehicles,
            movements: row.movements,
            motorcyclist: row.motorcyclist,
            mileage: row.mileage,
            created_at: row.created_at,
          }));

          resolve(vehicle);
        },
      );
    });
  },
  movementList: (p_motorcyclist) => {
    return new Promise((resolve, reject) => {
      db.query(
        "CALL sp_register_movement_list(?)",
        [p_motorcyclist],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          const rows = results && results[0];

          if (!rows || !Array.isArray(rows) || rows.length === 0) {
            return resolve(null);
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

          resolve(movements);
        },
      );
    });
  },
};

module.exports = MovementModel;
