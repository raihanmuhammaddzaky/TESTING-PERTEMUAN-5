const bcrypt = require('bcrypt');
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });
    res.status(201).json({
        message: "Registrasi berhasil",
        user: {
            id: user._id,
            username: user.username
        }
    });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) throw { status: 404, message: 'Username Salah' };

    const isPass = await bcrypt.compare(password, user.password);

    if (!isPass) throw { status: 401, message: 'Password Salah' };

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.json({ token });
}

