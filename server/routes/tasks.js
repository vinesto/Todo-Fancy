var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication')
var { getAllTask, createTask, deleteTask, updateTask } = require('../controllers/tasks')

/* GET users listing. */
router.get('/', authentication, getAllTask)
router.post('/', authentication, createTask)
router.delete('/:id', authentication, deleteTask)
router.put('/:id', authentication, updateTask)

module.exports = router;
