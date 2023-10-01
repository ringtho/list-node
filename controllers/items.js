
const getAllItems = (req, res) => {
    res.status(200).json({ msg: 'Get all items' })
}

const createItem = (req, res) => {
  res.status(201).json({ msg: 'Create an Item' })
}

const getSingleItem = (req, res) => {
  res.status(200).json({ msg: 'Get single Item' })
}

const updateItem = (req, res) => {
  res.status(200).json({ msg: 'Modify Item' })
}

const deleteItem = (req, res) => {
  res.status(200).json({ msg: 'Delete Item' })
}

module.exports = {
    getAllItems,
    createItem,
    getSingleItem,
    updateItem,
    deleteItem
}