const mongoose = require('mongoose')

const book = mongoose.model(
    'book',
    new mongoose.Schema({
        title: {type: String, require: true},
        author: {type: String, require: true},
        description: {type: String, require: true},
        imageurl: {type: String, require: true},
        rating: {type: Number, require: true},
        read: {type: Boolean, require: true},
        wishlist: {type: Boolean, require: true},
        notes: {type: String, require: true},
        dateRead: { type: Date, default: Date.now },
    })
)

module.exports = book


/*

Title
Author
Description
Imagelink
Rating
HasBeenRead: true
Wishlist: false
Notes / Review
DateRead



*/