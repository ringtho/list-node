const express = require('express')
const router = express.Router()

const {
    getAllItems,
    getSingleItem,
    createItem,
    updateItem, 
    deleteItem,
    searchItems
} = require('../controllers/items')

router.route('/')
    .post(createItem)
    .get(getAllItems)

router.route('/search')
    .post(searchItems)

router.route('/:id')
    .patch(updateItem)
    .get(getSingleItem)
    .delete(deleteItem)

module.exports = router