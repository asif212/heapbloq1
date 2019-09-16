const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    blogId: { type: Number, required: true, unique: true },
    blogUrl: { type: String, required: true },
    title: {
        type: String,
        required: true,
    },
    subtitle: { type: String, required: true },
    blogBody: { type: String, required: true },
    userType: { type: Number, default: 1 },
    userName: { type: String },
    timestamp: { type: Number, required: true },
    categoryID: { type: String, required: true },
    blogTags: { type: Array }
});

module.exports = mongoose.model('Blog', blogSchema);