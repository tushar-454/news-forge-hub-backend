const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
require('dotenv').config();
const routes = require('./Routes');
const ConnectDB = require('./Database/db');
const globalError = require('./Error/globalError');

app.use(express.json());
app.use(routes);
app.use(globalError);

app.get('/health', (req, res) => {
  res.json({ message: 'Api health is fine' });
});

ConnectDB(process.env.URI)
  .then(() => {
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
    app.listen(port, () => {
      console.log(`Server is running on  http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
