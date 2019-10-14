module.exports = function (router) {
  const forumController = require('../controller/forumController.js/index.js');

  // router.get('/forum', postController.createPost);
  router.post('/newPost', forumController.createPost);
  router.get('/getAllPost', forumController.getAllPost);
};
