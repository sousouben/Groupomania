const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/post');

//router posts
router.get('/', auth, userCtrl.getAllPosts);
router.post('/', auth, userCtrl.createPost);
router.get('/:id', auth, userCtrl.getOnePost);
router.delete('/:id', userCtrl.deleteOnePost);
router.put('/:id', auth, userCtrl.modifyOnePost);

//router commentaires
router.get('/:id/comments', auth, userCtrl.getAllComments);
router.post('/:id/comment/', auth, userCtrl.createComment);
router.delete('/comment/:id', auth, userCtrl.deleteComment);

module.exports = router;