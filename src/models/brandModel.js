const pool = require("../config/database");

const BrandModel = {
  brandList: async () => {
    try {
      const [results] = await pool.query("CALL sp_brand_list()");

      const rows = results[0];

      if (!rows || !Array.isArray(rows)) {
        return [];
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

module.exports = BrandModel;
