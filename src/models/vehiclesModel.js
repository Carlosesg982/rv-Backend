const db = require("../services/dbConnection");

const VehiclesModel = {
  vehiclesList: () => {
    return new Promise((resolve, reject) => {
      db.query("CALL sp_vehicles_list()", (err, results) => {
        if (err) {
          return reject(err);
        }

        const rows = results && results[0];

        if (!rows || !Array.isArray(rows) || rows.length === 0) {
          return resolve(null);
        }

        const vehicles = rows.map((row) => ({
          id: row.id,
          plate: row.Plate,
          brand: row.brand_name,
          model: row.model_name,
          created_at: row.created_at,
          updated_at: row.updated_at,
        }));

        resolve(vehicles);
      });
    });
  },
  vehiclesAdd: (id_brand, id_model, plate) => {
    return new Promise((resolve, reject) => {
      db.query(
        "CALL sp_vehicle_add(?, ?, ?)",
        [id_brand, id_model, plate],
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
            plate: row.Plate,
            brand: row.brand_name,
            model: row.model_name,
            created_at: row.created_at,
            updated_at: row.updated_at,
          }));

          resolve(vehicle);
        },
      );
    });
  },
};

module.exports = VehiclesModel;
