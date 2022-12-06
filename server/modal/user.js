const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requied: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: String,
    status: Boolean
})

module.exports = mongoose.model("User", userSchema);
