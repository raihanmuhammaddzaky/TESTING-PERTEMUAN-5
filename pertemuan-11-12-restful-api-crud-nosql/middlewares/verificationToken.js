const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const header = req.headers.authorization;
    if (!header) throw ({
        status: 401,
        message: "Token Tidak Ditemukan"
    })

    const token = header.split(' ')[1];
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        throw {
            status: 401,
            message: "Token Tidak ditemukan Atau Kadaluarsa"
        }
    }
}

module.exports = verifyToken;