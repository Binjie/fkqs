const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    created: { type: Date, default: Date.now },
    createby: { type: String, required: true },
    modified: { type: Date, default: Date.now },
    modifyby: { type: String, required: true },
});

module.exports = mongoose.model("users", UserSchema);
