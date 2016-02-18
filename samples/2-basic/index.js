var express = require('express');
var app = express();

var nAccess = require('../../lib/'); // requiring nAccess from the parenting folder

app.use(nAccess);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3111, function () {
  console.log('Example app listening on port 3111!');
});
