const posts = require("../db/postsDb.json");

module.exports = (req, res, next) => {
  const slug = req.params.slug;
  const post = posts.find((post) => post.slug === slug);

  if (!post || !posts.includes(post)) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  req.checkedPost = post;

  next();
};
