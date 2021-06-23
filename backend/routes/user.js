const express = require('express');
const router = express.Router();
const auth = require('');
const userCtrl = require('../controllers/user');

//router users
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
