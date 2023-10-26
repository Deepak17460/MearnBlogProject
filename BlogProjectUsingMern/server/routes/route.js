import express from 'express';
import  {singupUser,loginUser} from '../controller/user-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import {createPost, getAllPosts, getPost,  updatePost, deletePost} from '../controller/post-controller.js';
import upload from './../middleware/upload.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import { addComment, getAllComments, deleteComment } from '../controller/comment-controller.js';

const router = express.Router();

router.post('/signup', singupUser);
router.post('/login', loginUser);

router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:filename', getImage);

router.post('/create',authenticateToken,createPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id',authenticateToken, deletePost);

router.get('/posts',authenticateToken,getAllPosts);

router.get('/details/:id',authenticateToken,getPost);


router.post('/comment/new',authenticateToken,addComment);
router.get('/comments/:id',authenticateToken,getAllComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);




export default router;