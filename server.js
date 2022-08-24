const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
const formData = require('express-form-data');

app.use(formData.parse());


require('dotenv').config()
process.env.TOKEN_SECRET = 'e6740d33b149004e3d34deae286b5da426c60604594d7c66c7a9e5b16a1edb85ecdd745dfc74a7689751d9430482213d8531b2c870f014c22c382b7523b21e0d';

var cors = require("cors");

app.use(cors()); // Use this after the variable declaration
const walletRoutes = require("./src/routes/wallet.routes");
app.use("/api/v1/wallet", walletRoutes);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
