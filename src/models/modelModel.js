const pool = require("../config/database");

const ModelModel = {
  modelList: async () => {
    try {
      const [results] = await pool.query("CALL sp_model_list()");

      const rows = results && results[0];

      if (!rows || !Array.isArray(rows) || rows.length === 0) {
        return null;
      }

      return rows.map((row) => ({
        id: row.id,
        name: row.title,
      }));
    } catch (error) {
      throw error;
    }
  },
};

module.exports = ModelModel;
