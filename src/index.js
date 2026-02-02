const express = require("express");
const cors = require("cors");
const vehicles = require("./Routes/vehicles.routes");
const brand = require("./Routes/brand.routes");
const model = require("./Routes/model.routes");
const movement = require("./Routes/movement.routes");

const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: process.env.URL_FRONTEND || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", vehicles);
app.use("/api", brand);
app.use("/api", model);
app.use("/api", movement);
app.get("/", (req, res) => {
  res.send("¡Hola mundo con Express!");
});

app.listen(PORT, () => {
  console.log(`El sistema está activo en http://localhost:${PORT}`);
});
