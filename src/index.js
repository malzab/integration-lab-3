const express = require('express');
const app = express();

const appSciezki = require('./app/routes.js');
app.use('/api',appSciezki);

app.listen(3000, () => {
  console.log("Server działa");
});