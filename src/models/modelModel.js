const db = require("../services/dbConnection");

const ModelModel = {
  modelList: () => {
    return new Promise((resolve, reject) => {
      db.query("CALL sp_model_list()", (err, results) => {
        if (err) {
          return reject(err);
        }

        const rows = results && results[0];

        if (!rows || !Array.isArray(rows) || rows.length === 0) {
          return resolve(null);
        }

        const model = rows.map((row) => ({
          id: row.id,
          name: row.title,
        }));

        resolve(model);
      });
    });
  },
};

module.exports = ModelModel;
