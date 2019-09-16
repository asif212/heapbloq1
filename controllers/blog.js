const mongoose = require('mongoose');
const Blog = require('./../models/blogModel');


exports.addBlog = (req, res, next) => {
    
    
if( req.body.blogUrl == ""){
    let blogUrl = req.body.title;
    if (blogUrl) {
        blogUrl = blogUrl.toLowerCase().trim().replace(/\s/g, '-').slice(0, 150)+"-"+req.body.timestamp;
    } else {
        blogUrl = (req.body.timestamp).toString();
    }
    console.log(blogUrl);
    const blog = new Blog({
        _id: mongoose.Types.ObjectId(),
        blogId: req.body.timestamp,
        blogUrl: blogUrl.toString(),
        title: req.body.title,
        subtitle: req.body.subtitle,
        blogBody: req.body.blogBody,
        userType: req.body.userType,
        userName: req.body.userName,
        timestamp: req.body.timestamp,
        categoryID: req.body.categoryID,
        blogTags: req.body.blogTags,
    });
    blog.save()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                data:{
                    blogUrl : result.blogUrl,
                    blogId : result.blogId
                },
                STATUS: "success",
                MESSAGE: "Published successfully"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                STATUS: err
            });
        })
}else{
    const blog = new Blog({
        
        title: req.body.title,
        subtitle: req.body.subtitle,
        blogBody: req.body.blogBody,
        blogTags: req.body.blogTags
    });
Blog.update({blogUrl:req.body.blogUrl.toString()},{$set: blog},{new:true})
        .then((result) => {
            console.log(result);
            res.status(200).json({
                data:{
                    blogUrl : result
                },
                STATUS: "success",
                MESSAGE: "Updated successfully"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                STATUS: err
            });
        })
}
}
exports.getBlogById = (req, res, next) => {
    if (req.body.blogId) {
        Blog.findOne({ blogId: req.body.blogId })
            .exec()
            .then((data) => {
                if (data) {
                    res.status(200).json({
                        STATUS: "success",
                        BLOG: data
                    })
                } else {
                    res.status(200).json({
                        STATUS: "error",
                        MESSAGE: "Invalid blog request"
                    })
                }
            })
            .catch(err => {
                res.status(200).json({
                    STATUS: "error",
                    MESSAGE: "Invalid blog request"
                })
            })
    } else {
        res.status(200).json({
            STATUS: "error",
            MESSAGE: "Invalid blog request"
        })
    }
}

exports.getBlogByFlow = (req, res) => {
    var pageOptions = {
        page: req.body.page || 0,
        limit: req.body.count || 10
    }

    Blog.find()
        .skip(pageOptions.page * pageOptions.count)
        .limit(pageOptions.count)
        .exec()
        .then((data) => {
            if (data) {
                res.status(200).json({
                    STATUS: "success",
                    BLOGS: data
                })
            } else {
                res.status(200).json({
                    STATUS: "error",
                    MESSAGE: "Invalid blog request"
                })
            }
        })
        .catch(err => {
            res.status(200).json({
                STATUS: "error",
                MESSAGE: "Invalid blog request"
            })
        })
}
