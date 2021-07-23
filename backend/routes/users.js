const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const usersCtrl = require('../controllers/users');

//router users
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.delete('/delete/:id', auth, usersCtrl.deleteProfil);
router.get('/myprofile/:id',auth, usersCtrl.userProfil);
router.put('/update', auth, usersCtrl.changeProfil);//modification profil

module.exports = router;
