const mongoose = require('mongoose')
const { Schema } = mongoose

const itemSchema = new Schema({
    item: {
        type: String,
        required: [true, 'Please provide the item name'],
        maxLength: 255 
    },
    quantity: {
        type: Number,
        required: [true, 'Please provide the quantity of the item']
    },
    notes: {
        type: String,
        maxLength: 255
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true }) 

module.exports = mongoose.model('Item', itemSchema)