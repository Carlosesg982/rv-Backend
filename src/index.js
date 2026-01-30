const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

const corsOptions = {
  origin: "http://localhost:4000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("¡Hola mundo con Express!");
});

app.listen(PORT, () => {
  console.log(`El sistema está activo en http://localhost:${PORT}`);
});
