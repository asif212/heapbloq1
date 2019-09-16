const express = require('express');
const router = express.Router();

const blogController = require('./../controllers/blog');

router.post('/addBlog', blogController.addBlog);
router.post('/getBlog', blogController.getBlogById);
router.post('/getBlogFlow', blogController.getBlogByFlow);
module.exports = router;
