const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const postsCtrl = require('../controllers/posts');
const multer = require('../middlewares/multer-config')


//router posts
router.get('/getPosts', auth, multer, postsCtrl.getAllPosts);
router.post('/new', auth, multer, postsCtrl.createPost);
router.get('/user/:id', auth, multer, postsCtrl.getPostProfile);
router.delete('/:id',auth, multer, postsCtrl.deletePost);
router.put('/:id/moderate', postsCtrl.moderatePost);

module.exports = router;