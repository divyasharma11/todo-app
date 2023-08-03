const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    item: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Todo", todoSchema);

