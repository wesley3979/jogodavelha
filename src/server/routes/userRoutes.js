const { Router } = require('express')
const routes = Router();
const userController = require('../controllers/userController');

routes.post('/register', userController.createUser)

module.exports = routes