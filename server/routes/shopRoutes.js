const express = require('express')
const shopCtrl =require('./../controllers/shopController')
const authCtrl = require('./../controllers/authControllers')

const router = express.Router()

router.route('/api/shop/create').post(authCtrl.authenticate,shopCtrl.create)

module.exports = router