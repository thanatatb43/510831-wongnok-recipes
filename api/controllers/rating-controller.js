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