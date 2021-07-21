const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const postsCtrl = require('../controllers/posts');
const multer = require('../middlewares/multer-config')


//router posts
router.get('/',auth, multer, postsCtrl.getAllPosts);
router.get('/:id', auth, multer, postsCtrl.getPostById);
router.post('/new', auth, multer, postsCtrl.createPost);
router.delete('/:id/delete',multer, postsCtrl.deletePost);
router.put('/update',auth, multer, postsCtrl.updatePost);//modification

module.exports = router;