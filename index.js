const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const Database = require('./Database/db');

app.get('/health', (req, res) => {
  res.json({ message: 'Api health is fine' });
});

// connect the databaes
Database();
