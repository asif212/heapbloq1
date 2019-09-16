// const mongoose = require('mongoose');
const UserProfile = require('./../models/userProfile');

require('dotenv').config();
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key,
    useAccelerateEndpoint: true,
    signatureVersion: 'v4',
    region: 'ap-south-1'
});

exports.getProfile = (req, res, next) => {
    var tokenData = req.body.tokenData;
    if (tokenData.userId) {
        UserProfile.findOne({ _id: tokenData.userId })
            .exec()
            .then(result => {
                res.status(200).json({
                    status: "success",
                    profileData: {
                        NAME: result.name,
                        AGE: result.age,
                        GENDER: result.gender,
                        WEIGHT: result.weight,
                        PROFILE_PIC_PATH: '',
                        IS_ACTIVE: result.isActiveGymer,
                        COINS: result.coins,
                        XTRAREPS_MINUTES: result.totalMinutesWithUs,
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(404).json({
                    status: "error",
                    message: "Unable to process request"
                });
            })
    }
}

exports.updateProfile = (req, res, next) => {
    UserProfile.update({ _id: req.body.tokenData.userId }, {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        bio: req.body.bio,
        weight: req.body.weight
    })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                status: "success",
                message: "Updation successful"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                status: "error",
                message: "Unable to process request"
            });
        })
}

exports.sign_S3 = (req, res) => {
    // const s3 = new aws.S3();
    // const fileName = req.query['file-name'];
    // const fileType = req.query['file-type'];
    const fileName = 'profile-pic/'+req.body.fileName;
    const fileType = req.body.fileType;
    const s3Params = {
        Bucket: process.env.s3bucketname,
        Key: fileName,
        Expires: 100,
        ContentType: fileType,
        ACL: 'bucket-owner-full-control'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        }

        res.status(200).json({
            signedRequest: data,
            url: `https://${process.env.s3bucketname}.s3.amazonaws.com/${fileName}`
        });
        res.end();
    });
}