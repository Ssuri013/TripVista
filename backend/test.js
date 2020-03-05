const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
        console.log("sent response")
        res.send("Hello aliigator");
});

app.listen(3000, () => {
  console.log('app listening on port 8080')
});