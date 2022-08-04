const path = require('path')
const express = require("express");
const app = express();
const router = express.Router();

const PORT = 3500;

app.use("/", express.static(path.join(__dirname, '..', 'frontend', 'build')))

app.listen(PORT, () => {
  console.log("running at port " + PORT);
});
