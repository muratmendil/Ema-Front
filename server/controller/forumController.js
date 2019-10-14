const Post = require('../models/post');

module.exports = {

  createPost: (req, res) => {
    const newPost = new Post();
    newPost.message = req.body.post.message;
    newPost.userId = req.body.post.userId;
    newPost.title = req.body.post.title;
    newPost.firstname = req.body.post.firstname;
    newPost.lastname = req.body.post.lastname;

    newPost.save(function (err) {
      if (err) {
        res.json({
          error: err
        });
      } else {
        res.json({
          status: true
        });
      }
    });
  },

  getAllPost: (req, res) => {
    Post.find({}, function (err, posts) {
      console.log(posts);
      res.json(posts);
    });
  }

};
