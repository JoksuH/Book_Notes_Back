const mongoose = require('mongoose')

const category = mongoose.model(
    'category',
    new mongoose.Schema({
        name: { type: String, required: true },
        books: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'book',
                required: true,
            },
        ],
    })
)

module.exports = category
