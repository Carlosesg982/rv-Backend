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
          return resolve([]);
        }

        const vehicles = rows.map((row) => ({
          id: row.id,
          plate: row.Plate,
          brand: row.brand_name,
          model: row.model_name,
          created_at: row.created_at,
          update_at: row.updated_at,
        }));

        resolve(vehicles);
      });
    });
  },
};

module.exports = VehiclesModel;
