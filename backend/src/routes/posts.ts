import { Router } from 'express';
import * as postController from '../controllers/postController';

const router = Router();

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.delete('/:postId', postController.deletePost);
router.post('/:postId/like', postController.toggleLike);
router.post('/:postId/comments', postController.addComment);
router.delete('/:postId/comments/:commentId', postController.deleteComment);

export default router;
