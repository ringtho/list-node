const { NotFoundError, BadRequestError } = require('../errors')
const Item = require('../models/item')
const { StatusCodes } = require('http-status-codes')

const getAllItems = async (req, res) => {
  const { userId } = req.user
  const items = await Item.find({ createdBy: userId }).sort('-updatedAt')
  res.status(StatusCodes.OK).json({ items, count: items.length })
}

const createItem = async (req, res) => {
  const { userId } = req.user
  req.body.createdBy = userId
  const item = await Item.create(req.body)
  res.status(StatusCodes.CREATED).json({ item })
}

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

const searchItems = async (req, res) => {
  const { body: { search }, user: { userId }} = req
  if (!search) {
    throw new BadRequestError('Please provide a search parameter')
  }
  const regex = new RegExp(search, 'i')
  const items = await Item.find({
    item: { $regex: regex },
    createdBy: userId
  })
  if (items.length === 0) {
    throw new NotFoundError('No items match your search')
  }
  res.status(StatusCodes.OK).json({ items, count: items.length })
}

module.exports = {
    getAllItems,
    createItem,
    getSingleItem,
    updateItem,
    deleteItem,
    searchItems
}