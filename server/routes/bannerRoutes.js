const express = require('express')
const bannerCtrl = require('./../controllers/bannerController')
const authCtrl=require('./../controllers/authControllers')

const router = express.Router()

router.route('/api/createbanner').post(bannerCtrl.create)
router.route('/api/listbanner').get(bannerCtrl.listBanner)
router.route('/api/updatebanner/:id').put(bannerCtrl.updateBanner)

module.exports=router