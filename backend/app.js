const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');
const app = express();


const url = 'mongodb+srv://deltase7en:KmxvazIpJwqjbeVt@valkyrie-ip6dl.mongodb.net/test?retryWrites=true&w=majority';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.createConnection(
  url, () => {})
  .then(() => {
    console.log('Connected to database!');
    return;
  })
  .catch(() => {
    console.log('Connection failed!')
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/static'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader(
  'Access-Control-Allow-Headers',
  "Origin, X-Resquested-With, Content-Type, Accept"
  );
  res.setHeader(
  'Access-Control-Allow-Methods',
  "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});


app.get('/api/posts' ,(req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched succesfully!',
        posts: documents
      });
    });
});

module.exports = app;
