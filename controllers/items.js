const { NotFoundError, BadRequestError } = require('../errors')
const Item = require('../models/item')
const { StatusCodes } = require('http-status-codes')

/* API Endpoint to get all items */
const getAllItems = async (req, res) => {
  const { userId } = req.user
  const { sort, item } = req.query
  const queryObject = { createdBy: userId }
  if (item) {
    queryObject.item = { $regex: item, $options: 'i' }
  }
  let result = Item.find(queryObject).collation({
    locale: 'en',
    caseLevel: true,
  }) 
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('completed -updatedAt -createdAt')
  }
  const items = await result
  res.status(StatusCodes.OK).json({ items, count: items.length })
}

/* API Endpoint to create an item */
const createItem = async (req, res) => {
  const { userId } = req.user
  req.body.createdBy = userId
  const item = await Item.create(req.body)
  res.status(StatusCodes.CREATED).json({ item })
}

/* API Endpoint to get a single item */
const getSingleItem = async (req, res) => {
  const {
    user: { userId },
    params: { id },
  } = req
  const item = await Item.findOne({ createdBy: userId, _id: id })
  if (!item) {
    throw new NotFoundError(`No item with id: ${id}`)
  }
  res.status(StatusCodes.OK).json({ item })
}

/* API Endpoint to update an item */
const updateItem = async (req, res) => {
  const {
    user: { userId },
    params: { id },
  } = req
  const item = await Item.findByIdAndUpdate({ _id: id, createdBy: userId},
  req.body, {new: true, runValidators: true }
  )
  if (!item) {
    throw new NotFoundError(`No item with id: ${id}`)
  }
  res.status(StatusCodes.OK).json({ item })
}

/* API Endpoint to delete an items */
const deleteItem = async (req, res) => {
  const { params: { id }, user: { userId } } = req
  const item = await Item.findOneAndRemove(
    { _id: id, createdBy: userId }
  )
  if (!item) {
    throw new NotFoundError(`No item with id: ${id}`)
  }
  res.status(StatusCodes.OK).json({
    msg: `Successfully deleted item with id ${id}`
  })
}

module.exports = {
    getAllItems,
    createItem,
    getSingleItem,
    updateItem,
    deleteItem
}