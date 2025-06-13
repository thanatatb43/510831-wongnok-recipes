const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/create-recipe-controller');
const passport = require('passport');
const passportJWT = require('../middlewares/passport-jwt');

// localhost:3000/recipes/
router.get('/', recipesController.index );

// localhost:3000/recipes/create
// router.post('/create', [passportJWT.isLogin] ,recipesController.create );
router.post('/create', recipesController.create );

// localhost:3000/recipes/10
router.get('/:id', recipesController.show );

// localhost:3000/recipes/edit
router.post('/edit', recipesController.edit );

module.exports = router;
