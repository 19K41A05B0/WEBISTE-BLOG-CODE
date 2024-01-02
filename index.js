const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true });

// Set up middleware
// Middleware setup
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});



// Your routes and other middleware


// Define the blog post schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model('Post', postSchema);

// Routes
// Routes
// Routes
// Routes
// Routes
app.get('/', async (req, res) => {
    try {
      // Fetch all posts from the database using async/await
      const posts = await Post.find({});
      console.log(posts);
      res.render('home', { posts: posts });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.post('/compose', (req, res) => {
  // Create a new post and save it to the database
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  newPost.save((err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/');
    }
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
