const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;

app.get('/health', (req, res) => {
  res.json({ message: 'Api health is fine' });
});

app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
