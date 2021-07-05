const express = require('express');
const auth = require('../middlewares/auth');
const commentCtrl = require('../controllers/comment');
const router = express.Router();

//router commentaires
router.get('/:id/comments', auth, commentCtrl.getAllComments);
router.post('/:id/comment', auth, commentCtrl.createComment);
router.delete('/:id/comment/:id', auth, commentCtrl.deleteComment);

module.exports = router;
