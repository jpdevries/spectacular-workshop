const express = require('express'),
fs = require('fs'),
app = express(),
path = require('path'),
Twig = require("twig");

app.get('/', (req, res) => {
  console.log('yo');
  res.render('index.twig', {

  });
})

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 1187;
app.listen(port, () => {
  console.log(`Find the server at: http://localhost:${port}/`); // eslint-disable-line no-console
});
