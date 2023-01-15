import { Router } from "express";
import { 
    getPosts, 
    getPostId, 
    createdPost, 
    deletePost, 
    updatePost 
} from "../controllers/posts.controllers.js";
const router = Router()

router.get('/posts', getPosts)
router.get('/posts/:id', getPostId)
router.post('/posts', createdPost)
router.put('/posts/:id', updatePost)
router.delete('/posts/:id',deletePost)

export default router
