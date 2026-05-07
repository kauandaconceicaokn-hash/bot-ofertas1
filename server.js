require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo conectado ✔️'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('API rodando ✔️');
});

app.listen(3000, () => {
  console.log('Servidor rodando');
});