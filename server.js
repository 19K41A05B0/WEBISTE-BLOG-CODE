// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a blog post schema
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model('Post', postSchema);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Home route - display all blog posts
app.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.render('home', { posts });
    } catch (err) {
        res.send(err);
    }
});

// Compose route - create a new blog post
app.get('/compose', (req, res) => {
    res.render('compose');
});

app.post('/compose', async (req, res) => {
    const { title, content } = req.body;
    const post = new Post({ title, content });
    try {
        await post.save();
        res.redirect('/');
    } catch (err) {
        res.send(err);
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
