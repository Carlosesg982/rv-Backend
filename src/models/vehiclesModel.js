const pool = require("../config/database");

const VehiclesModel = {
  vehiclesList: async () => {
    try {
      const [results] = await pool.query("CALL sp_vehicles_list()");

      const rows = results && results[0];

      if (!rows || !Array.isArray(rows) || rows.length === 0) {
        return null;
      }

      return rows.map((row) => ({
        id: row.id,
        plate: row.Plate,
        brand: row.brand_name,
        model: row.model_name,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }));
    } catch (error) {
      throw error;
    }
  },
  vehiclesAdd: async (id_brand, id_model, plate) => {
    try {
      const [results] = await pool.query("CALL sp_vehicle_add(?, ?, ?)", [
        id_brand,
        id_model,
        plate,
      ]);

      const rows = results && results[0];

      if (!rows || !Array.isArray(rows) || rows.length === 0) {
        return null;
      }

      return rows.map((row) => ({
        id: row.id,
        plate: row.Plate,
        brand: row.brand_name,
        model: row.model_name,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }));
    } catch (error) {
      throw error;
    }
  },
  vehiclesDelete: async (id_vehicle) => {
    try {
      const [results] = await pool.query("CALL sp_vehicle_delete(?)", [
        id_vehicle,
      ]);

      const rows = results && results[0];

      if (!rows || rows.length === 0) {
        return null;
      }

      return {
        id: rows[0].id,
        deleted: true,
        deletedAt: new Date().toISOString(),
      };
    } catch (error) {
      throw error;
    }
  },
  vehiclesUpdate: async (id_vehicle, id_brand, id_model, plate) => {
    try {
      const [results] = await pool.query("CALL sp_vehicle_update(?, ?, ?, ?)", [
        id_vehicle,
        id_brand,
        id_model,
        plate,
      ]);

      const rows = results && results[0];

      if (!rows || !Array.isArray(rows) || rows.length === 0) {
        return null;
      }

      return rows.map((row) => ({
        id: row.id,
        plate: row.Plate,
        brand: row.brand_name,
        model: row.model_name,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }));
    } catch (error) {
      throw error;
    }
  },
};

module.exports = VehiclesModel;
