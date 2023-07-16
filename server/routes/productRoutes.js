const express = require('express')
const productCtrl = require('./../controllers/productController')
const authCtrl=require('./../controllers/authControllers')
const router = express.Router()

router.route('/api/createProduct').post(productCtrl.create)
router.route('/api/productList').get(productCtrl.productList)
router.route('/api/productById/:id').get(productCtrl.productById)
router.route('/api/updateProduct/:id').put(productCtrl.updateProduct)
router.route('/api/deleteProduct/:id').delete(productCtrl.deleteProduct)
router.route('/api/recentProducts').get(productCtrl.recentProduct)

module.exports=router