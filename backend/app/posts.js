const router = require('express').Router();
const config = require('../config');
const path = require('path');
const multer = require('multer');
const {nanoid} = require('nanoid');
const auth = require('../auth');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    try {
        const posts = await Post
            .find()
            .sort({datetime: -1})
            .populate('author', 'name -_id')
            .limit(20)
            .lean();
        if(!posts && posts.length === 0) return res.send({message: 'Еще нет ни одного поста'});
        for(let postItem of posts) {
            const comments = await Comment.find({post: postItem._id});
            postItem.countComment = comments.length;
        }
        return res.send(posts);
    } catch (e) {
        return res.status(500).send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post
            .findOne({_id: req.params.id})
            .populate('author', 'name -_id');
        if(!post) return res.status(404).send({error: 'Пост не найден'});
        return res.send(post);
    } catch (e) {
        return res.status(400).send({error: 'Не верно указан id поста'});
    }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const post = new Post(req.body);
        if(req.file) {
            post.image = req.file.filename;
        }
        post.author = req.user._id;
        await post.save();
        return res.send({message: 'Пост успешно создан'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;