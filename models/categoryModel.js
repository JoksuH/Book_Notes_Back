const mongoose = require('mongoose')

const category = mongoose.model(
    'category',
    new mongoose.Schema({
        name: { type: String, required: true },
        books: [{ type: String }],
    })
)

module.exports = category
