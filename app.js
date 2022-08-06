const express = require('express');
const app = express();
const path = require('path');
const PORT = 5000;
const routes = require('./src/routes/index')

app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');

app.use('/', routes);

app.listen(PORT, function(){
  console.log('Servidor rodando na URL http://localhost:5000')
}); 