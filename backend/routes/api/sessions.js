// login
const express = require("express");
const router = express.Router();
//config
const keys = require("../../config/keys");
const passport = require("passport");

//jsonwebtoken
const jwt = require('jsonwebtoken');

const User = require("../../models/User");

// 引入验证方法
const validateLoginInput = require("../../validation/login");


router.post("", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // 判断isValid是否通过
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;
    // 查询数据库
    User.findOne({ username: username })
        .then(user => {
            if (!user) {
                return res.status(400).json({ username: "Username does not exist!" });
            }
            // 密码匹配
            if (user.password == password) {
                const rule = { id: user.id, username: user.username, email: user.email, created: user.created };
                jwt.sign(rule, keys.SECRETKEY, { expiresIn: 36000 }, (err, token) => {
                    if (err) throw err;
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                })
            } else {
                return res.status(400).json({ password: "Wrong password!" });
            }
        })
})


router.get("", passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req);
    res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        created: req.user.created
    });
});

router.delete("", (req, res) => {

});

module.exports = router;