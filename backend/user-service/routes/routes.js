const express = require('express')
const router = express.Router()
const { fetchAllUsers, createUser, updateUser, deleteUser } = require('../controllers/controller')

// call the fetchAllUsers function
// when a GET request is made
router.route('/').get(fetchAllUsers)

// call the createUser function
// when a POST request is made
router.route('/').post(createUser)

// call the updateUser function
// when a PUT request is made
router.route('/:id').put(updateUser)

// call the deleteUser function
// when a DELETE request is made
router.route('/:id').delete(deleteUser)

module.exports = router