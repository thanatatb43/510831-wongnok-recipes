const uuidv4 = require('uuid');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

const model = require('../models/index');

exports.index = async function(req, res, next) {
  const recipes = await model.Recipes.findAll({
    order: [['id', 'asc']]
  });

  return res.status(200).json({
    data: recipes
  });
}