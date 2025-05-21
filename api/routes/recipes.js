const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/create-recipe-controller');

// localhost:3000/recipes/
router.get('/', recipesController.index );

// // localhost:3000/news/
// router.post('/', [passportJWT.isLogin] ,newsController.create );

// // localhost:3000/news/upload
// router.post('/upload', [passportJWT.isLogin, upload.single('file')] ,newsController.upload );


module.exports = router;
