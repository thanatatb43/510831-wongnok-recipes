const argon2 = require('argon2');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const model = require('../models/index');

exports.index = async function(req, res, next) {
    // const users = await model.Users.findAll();
    // const users = await model.Users.findAll({
    //     attributes: ['id', 'fullname'],
    //     order: [['id','desc']]
    // });
    const users = await model.Users.findAll({
        attributes: { exclude: ['password'] },
        order: [['id','desc']]
    });
    // const sql = 'select * from users order by id desc';
    // const users = await model.sequelize.query(sql, {
    //     type: model.sequelize.QueryTypes.SELECT
    // });
    const totalRecord = await model.Users.count();
    
    return res.status(200).json({
        total: totalRecord,
        data: users
    });
}

exports.search =  async function(req, res, next) {
    const { fullname } = req.query;
   
    const users = await model.Users.findAll({
        attributes: { exclude: ['password'] },
        where: {
            fullname: { [Op.like]: `%${fullname}%` }
        },
        order: [['id','desc']]
    });

    if (users.length === 0) {
        return res.status(404).json({message: 'ไม่พบข้อมูลการค้นหา'});
    }

    return res.status(200).json({
        data: users
    });
}

// get user by id
exports.show = async function(req, res, next) {
    const { id } = req.params;

    const users = await model.Users.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: [{
            model: model.Recipes,
            as: 'recipes',
            attributes: [
                'id', 
                'name_of_menu', 
                'picture_of_menu',
                'material_of_menu',
                'menu_structure',
                'menu_duration',
                'menu_level_of_difficulty'
                ]
        }],
    });

    if (!users) {
        return res.status(404).json({message: 'ไม่พบข้อมูลผู้ใช้นี้'});
    }
    
    return res.status(200).json({
        data: users
    });
}

// insert (register) user
exports.register = async function(req, res, next) {
    const { fullname, email, password } = req.body;

    //1. เช็คอีเมล์ซ้ำ
    const userEmail = await model.Users.findOne({ where: {email: email} });
    if (userEmail) {
        return res.status(400).json({message: 'มีผู้ใช้งานอีเมล์นี้ในระบบแล้ว'});
    }

    //2. เข้ารหัส password
    const hash = await argon2.hash(password);

    //3. บันทึกลงตาราง users
    const newUser =  await model.Users.create({
        fullname: fullname,
        email: email,
        password: hash
    });
    
    return res.status(201).json({
        message: 'สมัครสมาชิกเรียบร้อย',
        user: newUser
    });
}


// delete user by id
exports.destroy = async function(req, res, next) {
    const { id } = req.params;

    //ลบ
    const resultNumber = await model.Users.destroy({
        where: { id: id }
    });

    if (resultNumber === 0) {
        return res.status(404).json({message: 'ไม่พบข้อมูลผู้ใช้นี้'});
    }
    
    return res.status(200).json({
        message: 'ลบข้อมูลเรียบร้อย'
    });
}


// login
exports.login = async function(req, res, next) {
    const { email, password } = req.body;

    //1. นำ email ไปตรวจสอบว่ามีอยู่ในระบบหรือไม่
    const user = await model.Users.findOne({ where: {email: email} });
    if (!user) {
        return res.status(404).json({message: 'ไม่พบอีเมล์นี้ในระบบ'});
    }

    //2. ถ้าอีเมล์มีอยู่จริง ให้นำรหัสผ่านจากตาราง ไปเปรียบเทียบกับ password ที่ส่งมา
    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
        return res.status(401).json({message: 'รหัสผ่านไม่ถูกต้อง'});
    }

    //3. สร้าง token และส่งให้ client (webapp, mobile app) ไว้ยืนยันตัวตนกับระบบเรา
    const token = jwt.sign(
      { user_id: user.id, role: user.role },
      process.env.JWT_KEY,
      {
          expiresIn: "2d"
      }
    );
    
    return res.status(200).json({
        message: 'เข้าสู่ระบบสำเร็จ',
        access_token: token,
        user: user.id
    });
}

// get profile (ต้องมี token หรือ login ก่อน)
exports.getProfile = (req, res, next) => {
    return res.status(200).json({
        user: {
            id: req.Users.id,
            fullname: req.Users.fullname,
            email: req.Users.email,
            created_at: req.Users.created_at
        }
    });
}
