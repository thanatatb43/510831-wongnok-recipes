const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

// localhost:3000/user/profile
// router.get('/profile', [passportJWT.isLogin] ,userController.getProfile );

/* GET users listing. */
// localhost:3000/user/
router.get('/', userController.index );

// localhost:3000/user/search?fullname=john&age=10
router.get('/search', userController.search );

// localhost:3000/user/10
router.get('/:id', userController.show );

// localhost:3000/user/ [POST Register]
router.post('/', userController.register );

// localhost:3000/user/login [POST Login]
router.post('/login', userController.login );

// delete localhost:3000/user/3
// router.delete('/:id', [passportJWT.isLogin, checkAdmin.isAdmin] ,userController.destroy );

module.exports = router;
