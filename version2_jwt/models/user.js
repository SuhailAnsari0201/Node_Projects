const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    id: { type: Number, default: Date.now, required: true, unique: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, maxlength: 10, unique: true },
    password: { type: String, required: true },
});
module.exports = mongoose.model("jwtEXAMPLE", userSchema);