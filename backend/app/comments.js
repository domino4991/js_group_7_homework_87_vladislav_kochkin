const router = require('express').Router();
const Comment = require('../models/Comment');
const auth = require('../auth');

router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        if(!comments || comments.length === 0) return res.status(404).send({error: "Комментариев нет"});
        return res.send(comments);
    } catch (e) {
        return res.status(500).send({error: 'Internal Server Error'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const comments = await Comment
            .find({post: req.params.id})
            .sort({datetime: -1})
            .populate('user', 'name -_id')
            .limit(20);
        if(!comments || comments.length === 0) return res.status(404).send({error: 'Комментариев к данному посту ещё нет'});
        return res.send(comments);
    } catch (e) {
        return res.status(500).send({error: 'Internal Server Error'});
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const comment = new Comment(req.body);
        comment.user = req.user._id;
        await comment.save();
        return res.send({message: "Ваш комментарий отправлен"});
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;