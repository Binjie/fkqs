const express = require("express");
const app = express();

//body-parser
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
const url = require("./config/keys").MONGOURI;
// Connect to mongodb
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

//add router
const users = require("./routes/api/users");
app.use("/api/users", users);
const sessions = require("./routes/api/sessions");
app.use("/api/sessions", sessions);

// passport
const passport = require("passport");
app.use(passport.initialize());
require("./config/passport")(passport);

app.get("/", (req, res) => {
    res.send("Hello BJ Studio !!!");
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is running on ${port} `);
})