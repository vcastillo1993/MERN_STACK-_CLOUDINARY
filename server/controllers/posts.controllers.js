import Post from '../models/Post.js'
import { deleteImage, uploadImage } from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.send(posts)
    } catch (error) {
        console.log('algon salio mal con la consulta de posts', error);
    }
}

export const getPostId = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.sendStatus('puede que el POSTS no exista ', 404)
        return res.json(post)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createdPost = async (req, res) => {
    try {
        const { title, description } = req.body
        let imagen
        if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            imagen = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        const newPosts = new Post({ title, description, image: imagen })
        await newPosts.save()
        return res.json(newPosts)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    try {
        const update = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
        console.log('post modificado ==> ', update);
        return res.json(update)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        const eliminado = await Post.findByIdAndDelete(req.params.id)
        if (!eliminado) return res.sendStatus(404)

        if(eliminado.image.public_id){
            await deleteImage(eliminado.image.public_id)
        }
        return res.send('POST eliminado')
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}