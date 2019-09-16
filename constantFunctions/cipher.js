module.exports = {
    encrypt64 : function (str) { return Buffer.from(str, 'utf8').toString('base64'); },

    decrypt64(b64Encoded) {
        try {
            return Buffer.from(b64Encoded, 'base64').toString('utf8');;
        } catch (err) {
            console.log(err);
            return b64Encoded;
        }
    }
}