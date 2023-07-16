const express = require('express')
const userCtrl =require('./../controllers/userController')

const router = express.Router()

router.route('/api/addUser').post(userCtrl.create)

module.exports = router