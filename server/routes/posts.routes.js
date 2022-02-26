import { Router } from 'express';
import { getPosts, getPostById , getPostsBySearch, createPost, updatePost, deletePost, likePost, commentPost } from '../controllers/posts.js';

import auth from '../middleware/auth.js';

const router = Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPostById);
//createW
router.post('/', auth, createPost);
//update
router.patch('/:id', auth, updatePost);
//delete
router.delete('/:id', auth, deletePost);

//like
router.patch('/:id/likePost', auth, likePost);
//comments
router.post('/:id/commentPost',auth, commentPost);

export default router;