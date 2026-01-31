const ModelModel = require("../models/modelModel");

exports.modelList = (req, res) => {
  ModelModel.modelList()
    .then((result) => {
      if (result === null) {
        return res.status(401).json({
          modelList: null,
        });
      }
      res.status(200).json({
        modelList: result,
      });
    })
    .catch((err) => {
      console.error("Error getting user list:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};
