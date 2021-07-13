const express = require('express');
const auth = require('../middlewares/auth');
const commentCtrl = require('../controllers/comments');
const router = express.Router();

//router commentaires
router.get('/:id/comments', auth, commentCtrl.getComments);
router.post('/:id/comment', auth, commentCtrl.createComment);
router.delete('/:id/comment/delete', auth, commentCtrl.deleteComment);
router.put('/:id/comment/update',auth, commentCtrl.updateComment);

module.exports = router;
