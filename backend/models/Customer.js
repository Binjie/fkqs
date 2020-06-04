const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    fax: { type: String, required: true },
    mobile: { type: String, required: true },
    remark: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    created: { type: Date, default: Date.now },
    createby: { type: String, required: true },
    modified: { type: Date, default: Date.now },
    modifyby: { type: String, required: true },
});

module.exports = mongoose.model("users", UserSchema);
