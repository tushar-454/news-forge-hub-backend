const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;
const routes = require('./Routes');
const ConnectDB = require('./Database/db');

app.use(express.json());
app.use(routes);

app.get('/health', (req, res) => {
  res.json({ message: 'Api health is fine' });
});

ConnectDB(process.env.URI).then(() => {
  console.log('Pinged your deployment. You successfully connected to MongoDB!');
  app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
  });
});
