// @login & register 
const express = require("express");
const router = express.Router();
//config
const keys = require("../../config/keys");
const passport = require("passport");

//jsonwebtoken
const jwt = require('jsonwebtoken');

const User = require("../../models/User");

// 引入验证方法
const validateRegisterInput = require("../../validation/register");
const isEmpty = require("../../validation/isempty");

router.post("", (req, res) => {
    //console.log(req.body);
    const { errors, isValid } = validateRegisterInput(req.body);
    // 判断isValid是否通过
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                return res.status(400).json({ username: "Username has been registed." });
            }
        });

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: "Email has been registed." });
            }
        });

    if (!isEmpty(errors)) {
        return res.status(400).json(errors);
    }

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });
    newUser.save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
})

router.post("", (req, res) => {

})

module.exports = router;