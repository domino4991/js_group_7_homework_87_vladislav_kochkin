const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Поле заголовок обязательно для заполнения']
    },
    description: {
        type: String,
        default: null,
        required: [function () { return this.image === null}, 'Описание или изображение должны быть заполнены']
    },
    image: {
        type: String,
        required: [function () {return this.description === null}, 'Описание или изображение должны быть заполнены'],
        default: null
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datetime: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;