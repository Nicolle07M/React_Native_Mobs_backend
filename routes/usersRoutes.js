const usersController = require('../controllers/usersControllers');

module.exports = (app) => {
    
 app.post('/api/users/create', usersController.register);
 app.post('/api/users/login', usersController.login);
} 