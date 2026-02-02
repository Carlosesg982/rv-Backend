const express = require("express");
const cors = require("cors");
const vehicles = require("./Routes/vehicles.routes");
const brand = require("./Routes/brand.routes");
const model = require("./Routes/model.routes");
const movement = require("./Routes/movement.routes");

const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
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
