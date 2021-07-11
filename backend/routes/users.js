const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const usersCtrl = require('../controllers/users');

//router users
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.delete('/delete', auth, usersCtrl.deleteProfile);
router.get('/myprofile', auth, usersCtrl.userProfile);
router.put('/update', auth, usersCtrl.changeProfile);

module.exports = router;
