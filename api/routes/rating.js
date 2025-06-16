const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating-controller');

// localhost:3000/user/profile
// router.get('/profile', [passportJWT.isLogin] ,userController.getProfile );

/* GET users listing. */
// localhost:3000/rating/
router.get('/', ratingController.index );

module.exports = router;
