const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const postCtrl = require('../controllers/post');


//router posts
router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.delete('/:id', postCtrl.deleteOnePost);
router.put('/:id', auth, postCtrl.modifyOnePost);

//router commentaires
router.get('/:id/comments', auth, postCtrl.getAllComments);
router.post('/:id/comment/', auth, postCtrl.createComment);
router.delete('/comment/:id', auth, postCtrl.deleteComment);

module.exports = router;