const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    authToken: function (user) {
        return jwt.sign({
            mobile: user.mobile,
            userId: user._id
        },
            "secret_superstar",
            {
                expiresIn: "23h"
            });
    }
}