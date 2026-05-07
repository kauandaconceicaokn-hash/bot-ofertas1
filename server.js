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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: false });

bot.sendMessage(process.env.CHAT_ID, 'Bot online e funcionando ✔️');
setTimeout(() => {
  console.log("Enviando teste Telegram...");

  bot.sendMessage(process.env.CHAT_ID, "Teste funcionando ✔️");
}, 8000);
const axios = require('axios');

async function buscarOfertas() {
  const url = "https://api.mercadolibre.com/sites/MLB/search?q=fone%20bluetooth";

  const res = await axios.get(url);

  return res.data.results.slice(0, 3);
}async function enviarOfertas() {
  const produtos = await buscarOfertas();

  produtos.forEach(p => {
    const mensagem =
      `🔥 OFERTA:\n` +
      `${p.title}\n` +
      `💰 R$ ${p.price}\n` +
      `${p.permalink}`;

    bot.sendMessage(process.env.CHAT_ID, mensagem);
  });
}setInterval(() => {
  console.log("Buscando ofertas...");
  enviarOfertas();
}, 1000 * 60 * 30); // a cada 30 minutos