const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) =>{
    try{
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.body.tokenData = decoded;
        next();
    }catch(error){
        res.status(401).json({
            status:"error",
            message:"Auth failed"
        })
    }
}