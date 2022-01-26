var express = require('express')
var router = express.Router()
const bookModel = require('./../models/bookModel')

/* post a menu recipe */
router.post('/addbook', function (req, res, next) {
    const newbook = new bookModel({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        description: req.body.description,
        imageurl: req.body.imageurl,
        read: req.body.read,
        wishlist: req.body.wishlist,
    })

    newbook.save((err) => {
        if (err) throw err
        res.send('Book Saved')
    })
})

//Get all menus

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


router.delete('/:bookID', function (req, res, next) {
    bookModel.deleteOne({ _id: req.params.bookID }).exec((err, result) => {
        if (err) throw err
        res.send(`Menu with the id ${req.params.menuID} deleted`)
    })
})

module.exports = router
