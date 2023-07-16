const express = require('express')
const adminCtrl=require('./../controllers/adminController')

const router = express.Router()

router.route('/api/update/admin').put(adminCtrl.updateAdmin)

module.exports = router