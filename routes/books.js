var express = require('express')
var router = express.Router()
const bookModel = require('./../models/bookModel')

/* add a new book */
router.post('/addbook', function (req, res, next) {
    const newbook = new bookModel({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        description: req.body.description,
        categories: req.body.categories,
        imageurl: req.body.imageurl,
        read: req.body.read,
        wishlist: req.body.wishlist,
    })

    newbook.save((err) => {
        if (err) throw err
        res.send('Book Saved')
    })
})

//Get all books
router.get('/', function (req, res, next) {
    bookModel
        .find()
        .sort('-dateAdded')
        .exec((err, books) => {
            if (err) throw err
            res.send(JSON.stringify(books))
        })
})

router.get('/:booktitle', function (req, res, next) {
    const reqtitle = req.params.booktitle
    bookModel
        .find({ title: reqtitle})
        .sort('-dateAdded')
        .exec((err, books) => {
            if (err) throw err
            res.send(JSON.stringify(books))
        })
})

router.put('/categories/:bookId', function (req, res, next) {
    bookModel
        .findOne({ _id: req.params.bookId})
        .exec((err, book) => {
            if (err) throw err
            console.log(book)
            book.categories = req.body.categories
            book.save((err) => {
                if (err) throw err
                res.send('categories added')
            })    
        })
    })

router.delete('/:bookID', function (req, res, next) {
    bookModel.deleteOne({ _id: req.params.bookID }).exec((err, result) => {
        if (err) throw err
        res.send(`Menu with the id ${req.params.menuID} deleted`)
    })
})

module.exports = router
