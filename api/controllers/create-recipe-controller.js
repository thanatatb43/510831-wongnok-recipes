const uuidv4 = require("uuid");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

const model = require("../models/index");
const { where } = require("sequelize");

exports.index = async function (req, res, next) {
  const recipes = await model.Recipes.findAll({
    order: [["id", "desc"]],
  });

  return res.status(200).json({
    data: recipes,
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
    user_id,
  } = req.body;

  await model.Recipes.create({
    name_of_menu: name_of_menu,
    picture_of_menu: picture_of_menu,
    material_of_menu: material_of_menu,
    menu_structure: menu_structure,
    menu_duration: menu_duration,
    menu_level_of_difficulty: menu_level_of_difficulty,
    // user_id: req.user.id,
    user_id: user_id,
  });

  return res.status(201).json({
    message: "เพิ่มสูตรอาหารเรียบร้อย",
  });
};

// get recipes by id
exports.show = async function (req, res, next) {
  const { id } = req.params;

  const returnRecipes = await model.Recipes.findOne({ where: { id: id } });

  if (!returnRecipes) {
    return res.status(404).json({ message: "ไม่พบข้อมูลสูตรอาหารนี้" });
  }

  return res.status(200).json({
    data: returnRecipes,
  });
};

//edit recipes
exports.edit = async function (req, res, next) {
  const {
    name_of_menu,
    picture_of_menu,
    material_of_menu,
    menu_structure,
    menu_duration,
    menu_level_of_difficulty,
    user_id,
    id,
  } = req.body;

  //verify user_id and id
  const user = await model.Recipes.findOne({
    where: { id: id, user_id: user_id },
  });
  if (!user) {
    return res.status(404).json({ message: "คุณไม่มีสิทธิแก้ไขสูตรนี้" });
  }

  const returnRecipes = await model.Recipes.update(
    {
      name_of_menu: name_of_menu,
      picture_of_menu: picture_of_menu,
      material_of_menu: material_of_menu,
      menu_structure: menu_structure,
      menu_duration: menu_duration,
      menu_level_of_difficulty: menu_level_of_difficulty,
    },
    { where: { id: id, user_id: user_id } }
  );

  if (!returnRecipes) {
    return res.status(404).json({ message: "ไม่พบข้อมูลสูตรอาหารนี้" });
  }

  return res.status(200).json({
    data: returnRecipes,
  });
};

//delete recipes
exports.delete = async function (req, res, next) {
  const { user_id, id } = req.body;

  //verify user_id and id
  const user = await model.Recipes.findOne({
    where: { id: id, user_id: user_id },
  });
  if (!user) {
    return res.status(404).json({ message: "คุณไม่มีสิทธิแก้ไขสูตรนี้" });
  }

  const returnRecipes = await model.Recipes.destroy({
    where: { id: id, user_id: user_id },
  });

  if (!returnRecipes) {
    return res.status(404).json({ message: "ไม่พบข้อมูลสูตรอาหารนี้" });
  }

  return res.status(200).json({
    message: "ลบข้อมูลสำเร็จ",
  });
};

// get recipes by id with owner
exports.showwithowner = async function (req, res, next) {
  const { id } = req.params;

  const returnRecipes = await model.Recipes.findByPk(id,
  {
      include: [{
        model: model.Users,
        as: 'user',
        attributes: [
          'id',
          'fullname',
          'email'
        ]
      }]
  }
  );

  if (!returnRecipes) {
    return res.status(404).json({ message: "ไม่พบข้อมูลสูตรอาหารนี้" });
  }

  return res.status(200).json({
    data: returnRecipes,
  });
};
