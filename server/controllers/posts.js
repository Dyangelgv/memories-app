import mongoose from "mongoose";
import PostMessage from "../models/postsMessage.js";

export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        //variables
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT //get the starting index of every post
        const total = await PostMessage.countDocuments({});
        //buscar los posts, con un limite determinado
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPage: Math.ceil(total / LIMIT) });

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post)
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    //console.log(`search: ${searchQuery} tags: ${tags}`);
    try {
        //Buscaremos title posee una expresion irregular
        const title = new RegExp(searchQuery, 'i');
        //buscamos como primer argumento el titulo, sino la matriz de etiquetas
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: err.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    //todo: difundimos los valores, el creator es asignando y la fecha creada
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();
        //status(201): Created
        res.status(201).json(newPost);
    } catch (err) {
        //status(409): Conflit
        res.status(409).json({ message: err.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    //console.log(`id: ${_id} y body: ${post}`);
    try {
        //todo: if no found id, send an message error
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: "Not Post with that id" });

        const updatedpost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

        res.status(200).json({ message: updatedpost })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: "Not Post with that id" });

        await PostMessage.findByIdAndRemove(_id);

        res.status(200).json({ message: "Post Delete Successfuly!" })

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    try {
        //todo: verificamos authentificación
        if (!req.userId) return res.json({ message: 'Unaunthenticated' });

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "Not Post with that id" });

        const post = await PostMessage.findById(id);
        //todo: creamos un index de acuerdo con el user id
        const index = post.likes.findIndex((id) => id === String(req.userId));
        //console.log("index",index);
        if (index === -1) {
            //post add likes
            post.likes.push(req.userId);
        } else {
            //post remove like our add dislike
            post.likes = post.likes.filter((id) => id !== String(req.userId))
        }

        const updatedLike = await PostMessage.findByIdAndUpdate(id, post, { new: true });

        res.status(200).json(updatedLike);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
}

export const commentPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { value } = req.body;
        console.log(value);
        const post = await PostMessage.findById(id);

        post.comments.push(value);

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

        res.status(200).json(updatedPost);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}