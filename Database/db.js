const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;

const ConnectDB = async () => {
  await mongoose.connect(process.env.URI);
  console.log('Pinged your deployment. You successfully connected to MongoDB!');
  app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
  });
};

module.exports = ConnectDB;
