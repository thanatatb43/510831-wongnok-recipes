const uuidv4 = require("uuid");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

const model = require("../models/index");

exports.index = async function (req, res, next) {
  const recipes = await model.Recipes.findAll({
    order: [["id", "desc"]],
  });

  return res.status(200).json({
    data: recipes
  });
};

// เพิ่มสูตรใหม่
exports.create = async function (req, res, next) {
  const { 
    name_of_menu, 
    picture_of_menu, 
    material_of_menu,
    menu_structure,
    menu_duration,
    menu_level_of_difficulty,
    user_id
  } = req.body;

  await model.Recipes.create({
    name_of_menu: name_of_menu,
    picture_of_menu: picture_of_menu,
    material_of_menu: material_of_menu,
    menu_structure: menu_structure,
    menu_duration: menu_duration,
    menu_level_of_difficulty: menu_level_of_difficulty,
    // user_id: req.user.id,
    user_id: user_id
  });

  return res.status(201).json({
    message: "เพิ่มสูตรอาหารเรียบร้อย",
  });
};
