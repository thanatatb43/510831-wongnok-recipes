const express = require('express');
const router = express.Router();

/* GET home page. */
// localhost:3000/
router.get('/', function(req, res, next) {
  res.send('Welcome to 510831-WongNok-Recipes');
});

module.exports = router;
