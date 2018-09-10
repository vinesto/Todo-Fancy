const Task = require('../models/task')

const createTask = function (req, res) {
    let { title, description } = req.body
    Task.create({
        title: title,
        description: description,
        userId: req.user.id
    })
        .then(function (newTask) {
            res.status(200).json({
                message: "create task succes",
                data: newTask
            })
        })
        .catch(function (err) {
            res.status(400).json({
                message: "create task failed",
                error: err.message
            })
        })
}

const deleteTask = function (req, res) {
    Task.findOneAndRemove({
        _id: req.params.id,
        userId: req.user.id
    })
        .then(function (newTask) {
            if (newTask) {
                res.status(200).json({
                    message: "delete task succes",
                    data: newTask
                })
            } else {
                res.status(400).json({
                    message: "you are not authorized access this page",
                })
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message: "delete task failed",
                error: err.message
            })
        })
}

const getAllTask = function (req, res) {
    Task.find({
        userId: req.user.id
    })
        .then(function (userTask) {
            res.status(200).json({
                message: "user task found",
                data: userTask
            })
        })
        .catch(function (err) {
            res.status(400).json({
                message: "user task not found",
                error: err.message
            })
        })
}

const updateTask = function (req, res) {
    let { title, description } = req.body
    let objForUpdate = {}

    if (title) objForUpdate.title = title
    if (description) objForUpdate.description = description

    var setObj = { $set: objForUpdate }

    Task.findOneAndUpdate(
        {
            _id: req.params.id,
            userId: req.user.id
        }, setObj)
        .then(function (updatedTask) {
            if (updatedTask) {
                res.status(200).json({
                    message: "update success",
                    data: updatedTask
                })
            } else {
                res.status(400).json({
                    message: "you are not authorized to access this page"
                })
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message: "update failed",
                error: err.message
            })
        })
}

const getOneTask = function(req,res){
    Task.findOne({
        _id:req.params.id
    })
    .then(function(task){
        res.status(200).json({
            message:"task found",
            data:task
        })
    })
    .catch(function(err){
        res.status(400).json({
            message:"task not found",
            error:err.message
        })
    })
}

module.exports = { createTask, deleteTask, getAllTask, updateTask, getOneTask }

