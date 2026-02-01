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
};

module.exports = MovementModel;
