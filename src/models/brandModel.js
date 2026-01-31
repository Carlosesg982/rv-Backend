const db = require("../services/dbConnection");

const BrandModel = {
  brandList: () => {
    return new Promise((resolve, reject) => {
      db.query("CALL sp_brand_list()", (err, results) => {
        if (err) {
          return reject(err);
        }

        const rows = results && results[0];

        if (!rows || !Array.isArray(rows) || rows.length === 0) {
          return resolve([]);
        }

        const brand = rows.map((row) => ({
          id: row.id,
          title: row.title,
        }));

        resolve(brand);
      });
    });
  },
};

module.exports = BrandModel;
