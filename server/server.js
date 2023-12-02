require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Halo, dunia!");
});
app.use("/public/uploads", express.static("public/uploads"));

const route = require("./route");
app.use(route);
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
