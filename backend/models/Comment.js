const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    comment: {
        type: String,
        required: [true, "Поле комментария обязательно для заполнения"]
    },
    datetime: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;