const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const Post = require('./models/Post');
const User = require('./models/User');
const Comment = require('./models/Comment');

mongoose.connect(config.database, config.databaseOpt);

const db = mongoose.connection;

db.once('open', async () => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        for(let nameColl of collections) {
            await db.dropCollection(nameColl.name);
        }
        const [john, sam] = await User.create({
            username: 'John',
            password: 'testpass',
            name: 'John Doe',
            token: nanoid()
        }, {
            username: 'Sam',
            password: 'testpass',
            name: 'Sam Carter',
            token: nanoid()
        });

        const [helloWorld, loremIpsum] = await Post.create({
            title: 'Hello world',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac odio odio. Sed congue nunc nisi, sed pellentesque risus sollicitudin nec. Morbi dictum placerat fringilla. Sed nec eros eget enim rutrum porta in id arcu. Suspendisse commodo, mauris suscipit vulputate venenatis, mi dolor varius elit, eu pulvinar augue turpis sed tellus. Aliquam tempus varius nulla varius rutrum. Curabitur cursus, ipsum dapibus maximus venenatis, massa dui accumsan lectus, eget mattis felis nibh maximus libero. Aliquam et neque erat. Vivamus pellentesque diam felis, eget tincidunt odio euismod at. Nam consequat libero ex, ut posuere nisi convallis sit amet. In bibendum id nunc eu lacinia. Donec vel neque velit. Integer viverra tellus et quam maximus, dapibus viverra odio blandit. Mauris dapibus nibh ac sem rhoncus, nec luctus lacus vulputate. Integer ex velit, ornare non neque volutpat, placerat laoreet tellus. Vivamus eu magna ut arcu ornare volutpat sit amet nec est. Proin cursus arcu nec gravida pellentesque. Aenean aliquet sit amet ligula at hendrerit. Vestibulum pharetra mattis lorem in scelerisque. In aliquet lacus sem, quis auctor nisl egestas rhoncus. Nullam ac luctus odio. Integer at volutpat nibh. Nunc ornare ipsum dolor, vel ornare nisl efficitur vel. Pellentesque dictum nibh ex. Nunc vitae eros lorem. Morbi placerat quam sed ex condimentum rutrum. Sed eleifend, ipsum vitae pharetra imperdiet, ligula lacus luctus diam, quis eleifend lectus augue pulvinar massa.',
            image: 'pics.jpeg',
            author: john
        }, {
            title: 'Lorem ipsum dolor sit amet',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac odio odio. Sed congue nunc nisi, sed pellentesque risus sollicitudin nec. Morbi dictum placerat fringilla. Sed nec eros eget enim rutrum porta in id arcu. Suspendisse commodo, mauris suscipit vulputate venenatis, mi dolor varius elit, eu pulvinar augue turpis sed tellus. Aliquam tempus varius nulla varius rutrum. Curabitur cursus, ipsum dapibus maximus venenatis, massa dui accumsan lectus, eget mattis felis nibh maximus libero. Aliquam et neque erat. Vivamus pellentesque diam felis, eget tincidunt odio euismod at. Nam consequat libero ex, ut posuere nisi convallis sit amet. In bibendum id nunc eu lacinia. Donec vel neque velit. Integer viverra tellus et quam maximus, dapibus viverra odio blandit. Mauris dapibus nibh ac sem rhoncus, nec luctus lacus vulputate. Integer ex velit, ornare non neque volutpat, placerat laoreet tellus. Vivamus eu magna ut arcu ornare volutpat sit amet nec est. Proin cursus arcu nec gravida pellentesque. Aenean aliquet sit amet ligula at hendrerit. Vestibulum pharetra mattis lorem in scelerisque. In aliquet lacus sem, quis auctor nisl egestas rhoncus. Nullam ac luctus odio. Integer at volutpat nibh. Nunc ornare ipsum dolor, vel ornare nisl efficitur vel. Pellentesque dictum nibh ex. Nunc vitae eros lorem. Morbi placerat quam sed ex condimentum rutrum. Sed eleifend, ipsum vitae pharetra imperdiet, ligula lacus luctus diam, quis eleifend lectus augue pulvinar massa.',
            image: 'pics.jpeg',
            author: sam
        });
        await Comment.create({
            comment: 'Hello, im comment',
            user: sam,
            post: helloWorld
        }, {
            comment: 'Test comment',
            user: john,
            post: helloWorld
        }, {
            comment: 'Test comment',
            user: john,
            post: loremIpsum
        });
    } catch (e) {
        console.log(e);
    }
    db.close();
});