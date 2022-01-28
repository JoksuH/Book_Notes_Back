var express = require('express')
var router = express.Router()
const categoryModel = require('./../models/categoryModel')

/* GET categories. */
router.get('/', function (req, res, next) {
    categoryModel
        .find()
        .populate('book')
        .sort('name')
        .exec((err, categories) => {
            if (err) throw err
            res.send(JSON.stringify(categories))
        })
})

router.post('/', function (req, res, next) {
    categoryModel.exists({ name: req.body.category }, (err, result) => {
        if (err) console.log(err)
        //If category with the same name has not been found in database, create it
        else if (!result) {
            const category = new categoryModel({
                name: req.body.category,
                book: req.body.booktitle,
            })
            //And add the new book to it
            category.save(
                (err,
                function () {
                    categoryModel
                        .findOne({ name: req.body.category })
                        .exec((err, category) => {
                            if (err) throw err
                            else {
                                category.books.push(req.body.booktitle)
                                category.save((err) => {
                                    if (err) throw err
                                })
                                res.send('Book added')
                            }
                        })
                })
            )
        } else {
            // else add the book to  the previously found one
            categoryModel
                .findOne({ name: req.body.category })
                .exec((err, category) => {
                    console.log(category)
                    if (err) throw err
                    else {
                        category.books.push(req.body.booktitle)
                        category.save((err) => {
                            if (err) throw err
                        })
                        res.send('Book added')
                    }
                })
        }
    })
})

router.put('/', function (req, res, next) {
    const originalCategories = req.body.originalcategories
    //Checks if some previous categories selected in the database have been removed in new selection
    let removedcategories = originalCategories.filter(
        (element) => !req.body.categories.includes(element)
    )
    categoryModel
        .find({ name: req.body.categories })
        .exec((err, categories) => {
            if (err) throw err
            else {
                categories.forEach((category) => {
                    if (!category.books.includes(req.body.booktitle)) {
                        category.books.push(req.body.booktitle)
                        category.save((err) => {
                            if (err) throw err
                        })
                    }
                })
            }
        })
    if (removedcategories.length > 0) {
        categoryModel
            .find({ name: removedcategories })
            .exec((err, categories) => {
                if (err) throw err
                categories.forEach((category) => {
                    //Keep books other than the removed one
                    category.books = category.books.filter(
                        (book) => book !== req.body.booktitle
                    )
                    category.save((err) => {
                        if (err) throw err
                    })
                })
                res.send('Book added')
            })
    }
    res.send('Book added')
})

module.exports = router
