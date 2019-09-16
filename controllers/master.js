const Configuration = require('../models/masterModel');
exports.setAppConfiguration = (req, res) => {
    const conf = new Configuration( {
                adminId:11,
                isLogin: req.body.isLogin,
                isComment: req.body.isComment,
                themeId: req.body.themeId,
                topicList: req.body.topicList,
                interestList: req.body.interestList
        })
        conf.save()

    // conf.updateOne({ adminId: 11 }, {
    //     $set: {
    //         adminId:11,
    //         isLogin: req.body.isLogin,
    //         isComment: req.body.isComment,
    //         themeId: req.body.themeId,
    //         topicList: req.body.topicList,
    //         interestList: req.body.interestList
    //     }
    // },{ upsert: true })
        .then((data) => {
            console.log(data);
            res.status(200).json({
                STATUS: "success",
                MESSAGE: "Configuration updated successfully"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                STATUS: "error",
                ERROR: err
            });
        })
}

exports.appConfiguration = (req, res) => {
    Configuration.findOne()
        .exec()
        .then((data) => {
            res.status(200).json({
                STATUS: "success",
                CONFIGURATION: data
            })
        })
}