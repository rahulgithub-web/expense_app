const express = require('express');
const { loginController, registerController } = require('../controllers/userController')


//router object
const router = express.Router();

// ---------------- Register User -----------------
router.post('/register', registerController);

// ---------------- Login User -----------------
router.post('/login', loginController);


module.exports = router;