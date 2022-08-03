const express = require("express");
const app = express();
const router = express.Router();

const PORT = 3500;

app.get("/", (req, res) => {
  res.send("woi");
});

app.listen(PORT, () => {
  console.log("running at port " + PORT);
});
