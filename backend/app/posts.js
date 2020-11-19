const router = require('express').Router();
const config = require('../config');
const path = require('path');
const multer = require('multer');
const {nanoid} = require('nanoid');
const auth = require('../auth');
const Post = require('../models/Post');

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
            .populate('author', 'name')
            .limit(20);
        if(!posts && posts.length === 0) return res.send({message: 'Еще нет ни одного поста'});
        return res.send(posts);
    } catch (e) {
        return res.status(500).send({error: e});
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