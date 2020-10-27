const express = require('express');
const app = express();
const port = 3001;

app.get('/jobs', function (req, res) {
  return res.send('hello world');

})

app.listen(port, () => console.log("API listening on port", port));