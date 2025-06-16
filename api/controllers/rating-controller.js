const { Op } = require('sequelize');
const model = require('../models/index');

// get rating
exports.index = async function (req, res, next) {
  // const { id } = req.params;
  const rating = await model.Rating.findAll({
    attributes: ['rated_score', 'rated_comment', 'user_rating_id', 'recipes_rating_id'],
    include: [
      {
        model: model.Recipes,
        as: 'recipes_rating',
        attributes: [
          'id',
          'name_of_menu',
          'picture_of_menu',
          'material_of_menu',
          'menu_structure',
          'menu_duration',
          'menu_level_of_difficulty'
        ]
      },
      {
        model: model.Users,
        as: 'user_rating',
        attributes: [
          'id',
          'fullname'
        ]
      }],
  });

  const totalRecord = await model.Rating.count();

  if (!totalRecord) {
    return res.status(404).json({ message: 'ไม่พบข้อมูล' });
  }

  return res.status(200).json({
    total: totalRecord,
    data: rating
  });
}

// add new comment
exports.add = async function (req, res, next) {
  const {
    rated_score,
    rated_comment,
    recipes_rating_id,
    user_rating_id,
  } = req.body;

  const has_comment = await model.Rating.findOne({
    where: { recipes_rating_id: recipes_rating_id, user_rating_id: user_rating_id }
  }
  )

  const is_owner = await model.Recipes.findOne({
    where: {user_id: user_rating_id }
  }
  )

  if (has_comment) {
    return res.status(303).json({
      message: "คุณแสดงความคิดเห็นกับสูตรอาหารนี้ไปแล้ว",
      data: has_comment
    });
  }

  if (is_owner) {
    return res.status(303).json({
      message: "ไม่สามารถให้คะแนนสูตรอาหารตัวเองได้",
      data: is_owner
    });
  }

  const data = await model.Rating.create({
    rated_score: rated_score,
    rated_comment: rated_comment,
    recipes_rating_id: recipes_rating_id,
    user_rating_id: user_rating_id,
  });

  return res.status(201).json({
    message: "เพิ่มความคิดเห็นเรียบร้อย",
    data: data
  });
};

// get recipes by id
exports.showByRecipesId = async function (req, res, next) {
  const { id } = req.params;

  const returnRating = await model.Rating.findAll({
    where: { recipes_rating_id: id },
    attributes: ['rated_score', 'rated_comment'],
    include: {
      model: model.Users,
      as: 'user_rating',
      attributes: [
        'fullname'
      ]
    }
  });

  const totalRecord = await model.Rating.count({
    where: { recipes_rating_id: id },
  });

  if (!returnRating) {
    return res.status(404).json({ message: "ไม่พบข้อมูลคะแนนของสูตรอาหารนี้" });
  }

  return res.status(200).json({
    totalRecord: totalRecord,
    data: returnRating
  });
};