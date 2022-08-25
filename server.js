const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
const formData = require('express-form-data');

app.use(formData.parse());

var cors = require("cors");

app.use(cors()); // Use this after the variable declaration
const walletRoutes = require("./src/routes/wallet.routes");
app.use("/api/v1/", walletRoutes);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
