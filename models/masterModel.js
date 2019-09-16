const mongoose = require('mongoose');

const masterSchema = mongoose.Schema({
    adminId: { type: Number},
    isLogin: { type: Boolean},
    isComment: { type: Boolean},
    themeId: { type: Number},
    topicList: { type: Array},
    interestList: { type: Object }
});

module.exports = mongoose.model('Configuration', masterSchema);