const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const posts = require('./app/posts');
const users = require('./app/users');
const comments = require('./app/comments');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.database, config.databaseOpt);

    console.log('Connected to Mongo DB Forum app');

    app.use('/posts', posts);
    app.use('/users', users);
    app.use('/comments', comments);
    app.use((req, res) => {
        res.status(404).send({error: '404 Page Not Found'});
    })

    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
};

run().catch(console.log);