const mongoose = require('mongoose')
const Schema = mongoose.Schema

var taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: "User" }
},{
    timestamps:true
})

var Task = mongoose.model('Task', taskSchema)

module.exports = Task

