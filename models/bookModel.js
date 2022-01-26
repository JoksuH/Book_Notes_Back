const mongoose = require('mongoose')

const book = mongoose.model(
    'book',
    new mongoose.Schema({
        title: {type: String, require: true},
        author: {type: String, require: true},
        isbn: {type: String, require: true},
        description: {type: String, require: true},
        imageurl: {type: String},
        rating: {type: Number},
        read: {type: Boolean, require: true},
        wishlist: {type: Boolean, require: true},
        highlightnotes: {type: [String]},
        review: {type: String},
        notes: {type: [String]},
        dateRead: { type: Date, default: Date.now },
    })
)

module.exports = book


/*

Title
Author
isbn
Description
Imagelink
Rating
HasBeenRead: true
Wishlist: false
Notes / Review
DateRead



*/